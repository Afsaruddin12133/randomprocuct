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
      app.get('/products',async(req,res) =>{
        const page = req.query.page;
        const size = req.query.size;
        const query = {};
        const cursor = database.find(query);
        let products;
        if(page || size){
          products =  await cursor.skip(page*size).limit(size).toArray();
        }else{
          products =  await cursor.toArray();
        }
      
       res.send(products);
      })
      app.get('/productscount',async(req,res) =>{
        const query = {};
        const cursor = database.find(query);
       const productcount =  await cursor.count();
       res.send({productcount});
      })
        
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