const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route'); // Imports routes for the products
const app = express();
const MongoCli = require('mongodb').MongoClient;
//const url = "mongodb://127.0.0.1:27017/dev";
const url = "mongodb://localhost:27017/";
//app.set('view engine', 'pug');
const hbs = require('hbs');
hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});
app.set('view engine', 'hbs');
/*
app.use('/products', product);
let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});*/


MongoCli.connect(url, (err, db) => {
 if (err) throw err;
 console.log("Database created!");
 var db = db.db("dev"); 
 //db.close();
});







app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
  console.log('listening on 3000')
})
app.get('/', function(req, res) {
  MongoCli.connect(url, (err, db) => {
    if (err) throw err;   
    var db = db.db("dev");   
    db.collection("test").find().toArray((err, result) => {   
      if (err) throw err;   
        //res.send(result); 
        //result.stringify = JSON.stringify(result);
        console.log(result);
        res.render('index', {data:result});
        //console.log(result)  
        //res.sendFile(__dirname + '/views/index.html',result)
      //db.close();
    }); 
  }); 
  
})
app.get('/about', (req, res) => {
  res.send('About page')
})
app.post('/quotes', (req, res) => {
  MongoCli.connect(url, (err, db) => {
    if (err) throw err;   
    var db = db.db("dev");   
      db.collection("test").insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
  });   
   
  //res.send(req.body)
})
app.get('/users', (req, res) => {
  MongoCli.connect(url, (err, db) => {
    if (err) throw err;   
    var dbo = db.db("dev");   
    dbo.collection("users").find().limit(5).toArray((err, result) => {   
      if (err) throw err;   
      res.send(result);   
      db.close();
    });   
  });
})