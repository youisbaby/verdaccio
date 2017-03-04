import Cookies from 'cookies';
import express  from 'express';
import bodyParser from 'body-parser';
import Middleware from '../middleware';
import routes from './routes';

const expect_json   = Middleware.expect_json
const match    = Middleware.match
const media    = Middleware.media
const validate_name = Middleware.validate_name
const validate_pkg  = Middleware.validate_package

/**
 * Define the CLI API.
 * @param config
 * @param auth
 * @param storage
 */
module.exports = function(config, auth, storage) {
  const app = express.Router();
  const can = Middleware.allow(auth);

  // validate all of these params as a package name
  // this might be too harsh, so ask if it causes trouble
  app.param('package',  validate_pkg);
  app.param('filename', validate_name)
  app.param('tag',      validate_name)
  app.param('version',  validate_name)
  app.param('revision', validate_name)
  app.param('token',    validate_name)

  // these can't be safely put into express url for some reason
  app.param('_rev',             match(/^-rev$/));
  app.param('org_couchdb_user', match(/^org\.couchdb\.user:/));
  app.param('anything',         match(/.*/));

  // encode / in a scoped package name to be matched as a single parameter in routes
  app.use(function(req, res, next) {
    if (req.url.indexOf('@') != -1) {
      // e.g.: /@org/pkg/1.2.3 -> /@org%2Fpkg/1.2.3, /@org%2Fpkg/1.2.3 -> /@org%2Fpkg/1.2.3
      req.url = req.url.replace(/^(\/@[^\/%]+)\/(?!$)/, '$1%2F')
    }
    next()
  });
  
  app.use(auth.basic_middleware());
  //app.use(auth.bearer_middleware())
  app.use(bodyParser.json({ strict: false, limit: config.max_body_size || '10mb' }));
  app.use(Middleware.anti_loop(config));
  // apply all routes
  app.use(routes(config, auth, storage));

  return app;
}
