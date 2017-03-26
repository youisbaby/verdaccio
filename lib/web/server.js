import React from 'react';
import async from 'async';
import styleSheet from 'styled-components/lib/models/StyleSheet'
import { renderToString } from 'react-dom/server';
import HTML from './components/html';
import App from './components/app';

const fetchItems = function(config, auth, storage, req) {
	return new Promise( function(resolve, reject) {
	  const base = config.url_prefix
						? config.url_prefix.replace(/\/$/, '')
						: `${req.protocol}://${req.get('host')}`
		storage.get_local(function(err, packages) {
			if (err) { 
				reject(err);
			}
		async.filterSeries(packages, function(pgk, cb) {
			auth.allow_access(pgk.name, req.remote_user, function(err, allowed) {
				setImmediate(function () {
					if (err) {
						cb(null, false);
					} else {
						cb(err, allowed)
					}
				})
			})
		}, function(err, packages) {
			if (err) {
				reject(err);
			}
			packages.sort(function(p1, p2) {
				if (p1.name < p2.name) {
					return -1;
				}
				else {
					return 1;
				}
			});
			resolve({
				name: config.web && config.web.title ? config.web.title : 'Verdaccio',
				packages: packages,
				baseUrl: base,
				username: req.remote_user.name,
			})
		})
	})
	});
}

export default function renderViewMiddleware(config, auth, storage) {
	
	return async function(req, res, next) {
		try {
			const doctype = '<!doctype html>\n'
			const styles = styleSheet.rules().map(rule =>
			{
				// console.log('cssText', rule);
				return rule.cssText;
			}).join('\n');
			let data = await fetchItems(config, auth, storage, req);
			res.setHeader('Content-Type', 'text/html');
			// render main view
			const renderedHTML = renderToString(
				<HTML 
					styles={styles}
					data={`window.__INITIAL_STATE =
					${JSON.stringify({ data })}`}
					html={renderToString(<App {...data} />)} />
			)
			res.send(doctype + renderedHTML);
		} catch (err) {
				console.error(err);
				res.status(500).send({ error: 'Something failed!' })
		}
	}
}