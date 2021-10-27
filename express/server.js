'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
    

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Enjoy!</h1>');
  res.end();
});

app.get('/v/:id', cors(), function (req, res) {

  const referer = req.headers.referer;
  const fileId = req.params.id;
  const domain =  req.get('host');

  const sendGetRequest = async () => {
      try {
          const resp = await axios.post('https://www.fembed.com/api/source/'+fileId, {
            "r": referer,
            "d": domain
          });
          res.json({source: resp.data.data});
          console.log(resp.data);
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };

  sendGetRequest();

})
app.use(bodyParser.json());


//app.use('/.netlify/functions/server', router);  // path must route to lambda
//app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
/*
module.exports.handler = serverless(app);
*/
