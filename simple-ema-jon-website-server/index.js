const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 5000;


const MongoClient = require('mongodb').MongoClient;
const uri = ` mongodb+srv://emaJon:shahadat81@cluster0.vgg4u.mongodb.net/emaJonStore?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const productCollection = client.db("emaJonStore").collection("products");
    console.log('database connected')

    app.post('/addProducts', (req, res) => {
        const product = req.body;
        productCollection.insertMany(product)
            .then(result => {
                console.log(result.insertedCount);
            })
    })

    app.get('/products', (req, res) => {
        productCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.get('/product/:key', (req, res) => {
        productCollection.find({ key: req.params.key })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.get('/productsByKeys', (req, res) => {
        console.log(req.body);
        const productKeys = req.body;
        productCollection.find({ key: {$in : productKeys} })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

});


app.get('/', (req, res) => {
    res.send("Hello ema jon")
})

app.listen(port)