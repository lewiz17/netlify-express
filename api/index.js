const app = require('express')();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const port = 5001;

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

app.use(cors({
    origin: ['https://wizcontent.vercel.app']
}));
app.use(bodyParser.json());

var server = app.listen(port);
server.keepAliveTimeout = 30000;
/*app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})*/
module.exports = app;