const app = require('express')();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
    
app.get('/api/v/:id', cors(), function (req, res) {

  const fileId = req.params.id;

  const sendGetRequest = async () => {
      try {
          const resp = await axios.post('https://www.fembed.com/api/source/'+fileId, {
            "r": "",
            "d": "www.fembed.com"
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

module.exports = app;