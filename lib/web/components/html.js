import React from 'react';

const HTML = (props) => {
    return (
      <html>
        <head>
          <title>
            Verdaccio
          </title>
          <link rel="stylesheet" href="/-/static/styles.css"/>
          <style dangerouslySetInnerHTML={{ __html: props.styles }} />
        </head>
        <body className="body">
          <div id="root"
               dangerouslySetInnerHTML={{__html: props.html}}/>
          <script dangerouslySetInnerHTML={{__html: props.data}}/>
          <script src="/-/static/browser.js"/>
        </body>
      </html>
    );
}

export default HTML;
