const app = require('express')();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v/:id', function (req, res) {

  const fileId = req.params.id;

  const sendGetRequest = async () => {
      try {
          const resp = await axios.post('https://www.fembed.com/api/source/'+fileId, {
            r: req.headers.referer,
			d: req.hostname
          });
          res.json({source: resp.data});
          console.log('data file:',resp.data);
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };

  sendGetRequest();

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
module.exports = app;