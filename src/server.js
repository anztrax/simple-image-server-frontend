import express from 'express';
import path from 'path';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
const app = express();
app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, '../public')));

// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // hey we made it!
      const appHtml = renderToString(<RouterContext {...props}/>);
      res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
});

//${appHtml}
function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <link rel='stylesheet' href='/common.css' />
    <title>My First React Router App</title>
    <div id='app'></div>
    <script src="/bundle.js"></script>
   `
}

const PORT = process.env.PORT || 3010;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
