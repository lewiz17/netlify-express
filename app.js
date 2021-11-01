const express = require("express")
const app = express()
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const uuid = require('uuid');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { dirname } = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const router = express.Router();

app.use('/', router);

app.use("/assets", express.static("public"))


app.get('/', function (req, res) {
    res.redirect('/list');
});

router.get('/api/v2/:id', function (req, res) {
    const fileId = req.params.id;

    const sendGetRequest = async () => {
        try {
            const resp = await axios.get('https://damedamehoy.xyz/details.php?v='+fileId);
            //res.send(`<h2>Este es el video ${fileId}</h2>`)
            console.log(resp);
            res.send(`<video class="player" src="${resp.data.file}" preload controls></video>`);
            //res.redirect(resp.data.data[0].file);
            console.log('data file:',resp.data.file);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
  
    sendGetRequest();
})

router.get('/api/v/:id', function (req, res) {

  const fileId = req.params.id;

  const sendGetRequest = async () => {
      try {
          const resp = await axios.post('https://www.fembed.com/api/source/'+fileId, {
            r: req.headers.referer,
			d: req.hostname
          });
          //res.send(`<h2>Este es el video ${fileId}</h2>`)
          res.send(`<video class="player" src="${resp.data.data[0].file}" preload controls></video>`);
          //res.redirect(resp.data.data[0].file);
          console.log('data file:',resp.data.data[0].file);
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };

  sendGetRequest();

})

app.get('/items', function(req, res) {
    res.sendFile(path.resolve('public/data/index.json'));
})


router.get("/poster/:movie", async (req, res) => {
    const nameMovie = req.params.movie;
    const api = 'https://www.omdbapi.com/?apikey=a0b83e2d&t=';
    const api2 = 'https://api.themoviedb.org/3/search/movie?api_key=feb6f0eeaa0a72662967d77079850353&query=';

    try {
        await axios.get(`${api2}${nameMovie}`)
        .then(resData => {
            const resItems = resData.data.results.filter((v,i) => v.title.toLowerCase() === nameMovie.toLowerCase());
            res.redirect('https://www.themoviedb.org/t/p/w300_and_h450_bestv2'+resItems[0].poster_path); 
        })
        .catch(e => {
            console.log(e);
        })
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
    
})

router.post("/send", async (req, res) => {
    console.log(req);

    let formData = {
        id: uuid.v4(),
        name: req.body.name,
        file: req.body.file_id,
        poster: '/poster/'+encodeURIComponent(req.body.name)
    };
    try {
        let rawdata = fs.readFileSync(path.resolve('public/data/index.json'));
        var jsonBook = JSON.parse(rawdata);
        jsonBook.data.items.push(formData);
        let parsed = JSON.stringify(jsonBook, null, 2);
        fs.writeFile(path.resolve('public/data/index.json'), parsed, (err) => {
            if (err) throw err;
            console.log("saved");
        });
        res.send(`<h3>Archivo enviado con exito!, Redirigiendo...</h3>
            <script>
            setTimeout(()=>{
                location.replace('/');
            },3000)
            </script>
        `);
    } catch (error) {
        console.error("/visitorBook route error : ", error);
    }
});

app.get('/open/:id', function(req, res) {
    const videoId = req.params.id;
    const name = req.query.name;
    res.redirect('/api/v/'+videoId+'?name='+name);
});

app.get('/add', function(req, res) {
    res.sendFile(path.resolve('public/add.html'));
});

app.get('/list', function(req, res) {
    res.sendFile(path.resolve('public/list.html'));
});




app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

module.exports = app;