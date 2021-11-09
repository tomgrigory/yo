const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express();


MongoClient.connect('mongodb+srv://admin:GRP5r3OlFdHuSZLn@cluster0.mtkmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client => {
  console.log('connected to the db. lfg:)')
  const db = client.db('yo')
  const yosCollection = db.collection('yos')

  app.set('view engine', 'ejs')

  app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    db.collection('yos').find().toArray()
    .then(results => {
        res.render('index.ejs', { yos: results })
    })
    .catch(error => console.error(error))
  })


  app.post('/yo', (req, res) => {
    yosCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
        console.log(result)
      })
      .catch(error => console.error(error))
  })  
    

app.listen(3000, function() {
    console.log('yo, we are live on 3000')
  })
})
.catch(error => console.error(error))