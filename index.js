const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



app.get('/',(req,res) => {
    res.send('hello server')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lgbtz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
    try{
        await client.connect();
        const database = client.db('RahmanTravel');
        const servicesCollection = database.collection('package');
        const userCollection = database.collection('users')
        //get api
        app.get('/package', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });
        // POST API
        app.post('/package', async (req, res) => {
            const packages = req.body;
            console.log('hit the post api',packages);
            const result = await servicesCollection.insertOne(packages);
            console.log(result);
            res.json(result)
        });
         
        // delet data

        app.delete('/package/:id',async(req,res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.deleteOne(query);

            console.log('deleting user with id ', result);

            res.json(result);
        })

       
        //get api
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });
        // POST API
        app.post('/users', async (req, res) => {
            const packages = req.body;
            console.log('hit the post api',packages);
            const result = await userCollection.insertOne(packages);
            console.log(result);
            res.json(result)
        });
       

         // delet data

         app.delete('/users/:id',async(req,res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);

            console.log('deleting user with id ', result);

            res.json(result);
        })
        
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port,() => {
    console.log('rahman travel agency bangladesh')
})

//ypI1eNL4fhauAyKn