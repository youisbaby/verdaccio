import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';
import styled from 'styled-components';
import request from 'superagent';	 
import Header from './Header/header'; 
import Search from './Search/search';
import List from './list';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

if (process.env.BROWSER) {
	require("./browser.css");
}

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
  userAgent: false,
});

class App extends React.Component {

  constructor(props) {
    super();
    this.state = {
      packages: props.packages,
      front_packages: props.packages,
      req: null,
    };
    this.updatePackages = this.updatePackages.bind(this);
  }

  updatePackages(keyword) {
    if (keyword !== '') {
      if (this.req) {
        this.req.abort();
      }
      this.req = request.get(`/-/search/${keyword}`)
      .end((err, res) => {
          this.setState({
            packages: res.body
        })
      });
    } else {
      if (this.req) {
        this.req.abort();
      }
      this.setState({
        packages: this.state.front_packages
      })
    }
  }

  render() {
      return ( 
        <MuiThemeProvider muiTheme={muiTheme}>
          <main>
            <Header baseUrl={this.props.baseUrl} username={this.props.username}/>          
            <div className="wrapper">
              <Search updatePackages={this.updatePackages}/>
              <List packages={this.state.packages}/>
            </div>
          </main>
        </MuiThemeProvider>
      );
  }
}

export default App;
