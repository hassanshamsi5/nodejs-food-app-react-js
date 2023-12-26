const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 6001
require('dotenv').config();
console.log(process.env.DB_USER)


//middleware 

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vq4inqc.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}); 

async function run() {
    try {
        const menuCollections = client.db("demo-food-client").collection("menus")
        const cartCollections = client.db("demo-food-client").collection("cartItems")

        app.get('/menu', async (req, res) => {
            const result = await menuCollections.find().toArray();
            res.send(result)

        })

        await client.connect();

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

        // await client.close();
    }
}   
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello Developer')
})

app.listen(port, () => {
    console.log(`Example app lister on port ${port}`);
})