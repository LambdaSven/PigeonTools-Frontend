import express from 'express';
import fs from 'fs';


const app = express();
const port = 3000;

app.use(express.static('content'))
app.use(express.json())
app.use(express.urlencoded())

app.get('/tools/:service', (req, res) => {
  fs.readFile(`content/tools/${req.params.service}/index.html`, (err, data) => {
    if(err) {
        console.log('service file could not be found: ' + JSON.stringify(req.params, null, 2))
        res.redirect('/404');
    } else {
      res.send(data.toString())
    }
  })
})

app.post('/tools/login', (req, res) => {
  console.log(JSON.stringify(req.body))
  if(req.body?.password === 'pass') {
    fs.readFile(`content/tools/login/success.html`, (err, data) => {
      if(err) {
        res.redirect('/404')
      } else {
        res.send(data.toString())
      }
    })
  } else {
    fs.readFile(`content/tools/login/failure.html`, (err, data) => {
      if(err) {
        res.redirect('/404')
      } else {
        res.send(data.toString())
      }
    })
  }
})

app.get('/404', (_, res) => {
  res.send('<h1> YOU 404ed me waah </h1>')
})

app.listen(port, () => {
  console.log(`App Listening on port ${port}`)
})
