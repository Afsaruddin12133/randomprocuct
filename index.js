const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express()


//madilewaire..
app.use(cors());
app.use(express.json());

//Conect with mongodb..


const uri = `mongodb+srv://${process.env.PRODUCT_USER}:${process.env.PRODUCT_PASS}@cluster0.nhkunzd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try{
        await client.connect();
        const database = client.db("randomproduct").collection("product");
      app.get('/products',(req,res) =>{
        const query = {};
        const cursor = database.find(query);
        res.send(cursor);
      })
        // await cursor.forEach(console.dir);
    }
    finally{

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello Afsar Uddin')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })