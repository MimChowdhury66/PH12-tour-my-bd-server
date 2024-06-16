
const express = require('express')
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yq0oebc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const packageCollection = client.db('TourDB').collection('package')
    const guideCollection = client.db('TourDB').collection('Guide')
    const storyCollection = client.db('TourDB').collection('story')


    app.get('/package', async (req, res) => {
      const result = await packageCollection.find().sort({
        price: 1
      }).toArray();
      res.send(result)
    })


    app.get('/guide', async (req, res) => {
      const result = await guideCollection.find().toArray();
      res.send(result)
    })

    app.get('/story', async (req, res) => {
      const result = await storyCollection.find().toArray();
      res.send(result)
    })


    app.get('/guide/:id', async (req, res) => {
      const id = req.params.id;
      const result = await guideCollection.findOne({ _id: new ObjectId(id) });
      res.send(result)
    })
















    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res) => {
  res.send('Tour-My-Bangladesh-running')
})

app.listen(port, () => {
  console.log(`Tour-My-Bangladesh-running on port ${port}`)
})