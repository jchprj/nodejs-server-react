
var express = require('express');
import hbs from 'express-handlebars';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
var bodyParser = require('body-parser');
import App from './components/app';

var app = express();
app.use(express.static('public'));
app.engine('html', hbs({ extname: 'html' }));
app.set('view engine', 'html');
app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.locals.settings['x-powered-by'] = false;

app.get('/', function home (req, res, next) {
  res.render('layout', {
    reactHtml: ReactDOMServer.renderToString(<App />)
  });
});
app.post('/webapi', function (req, res) {
    var webapi = require('./server/webapi');
    webapi.handle(req, res);
})
app.get('/webapi', function (req, res) {
    var webapi = require('./server/webapi');
    webapi.handleGet(req, res);
})

app.listen(process.env.PORT || 3000);