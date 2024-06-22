
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
    const reviewCollection = client.db('TourDB').collection('review')
    const bookingCollection = client.db('TourDB').collection('booking')
    const userCollection = client.db('TourDB').collection('users')
    const wishlistCollection = client.db('TourDB').collection('wishlist')


    app.get('/package', async (req, res) => {
      const result = await packageCollection.find().sort({
        price: 1
      }).toArray();
      res.send(result)
    })
    app.post('/package', async (req, res) => {
      const newPost = req.body;
      const result = await packageCollection.insertOne(newPost);
      res.send(result)
    })
    app.get('/package/:id', async (req, res) => {
      const id = req.params.id;
      const result = await packageCollection.findOne({ _id: new ObjectId(id) });
      res.send(result)
    })
    app.get('/guide', async (req, res) => {
      const result = await guideCollection.find().toArray();
      res.send(result)
    })
    app.post('/guide', async (req, res) => {
      const newPost = req.body;
      const result = await guideCollection.insertOne(newPost);
      res.send(result)
    })
    app.get('/story', async (req, res) => {
      const result = await storyCollection.find().toArray();
      res.send(result)
    })
    app.post('/story', async (req, res) => {
      const newPost = req.body;
      const result = await storyCollection.insertOne(newPost);
      res.send(result)
    })
    app.post('/wishlist', async (req, res) => {
      const newPost = req.body;
      const result = await wishlistCollection.insertOne(newPost);
      res.send(result)
    })
    app.get('/wishlist/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await wishlistCollection.find(query).toArray();
      // console.log('wishlist', result)
      res.send(result)
    })

    app.delete('/wishlistDelete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { packageId: (id) };
      // console.log(id)
      const result = await wishlistCollection.deleteOne(query);
      // console.log(result)
      res.send(result)
    })



    app.get('/guide/:id', async (req, res) => {
      const id = req.params.id;
      const result = await guideCollection.findOne({ _id: new ObjectId(id) });
      res.send(result)
    })
    app.get('/story/:id', async (req, res) => {
      const id = req.params.id;
      const result = await storyCollection.findOne({ _id: new ObjectId(id) });
      res.send(result)
    })



    app.get('/packageTourType/:tourType', async (req, res) => {
      // console.log('tour type', req.params.tourType)

      const cursor = packageCollection.find({ TourType: req.params.tourType });
      const result = await cursor.toArray();
      // console.log('result', result)
      res.send(result)
    })



    app.post('/review', async (req, res) => {
      const newPost = req.body;
      const result = await reviewCollection.insertOne(newPost);
      res.send(result)
    })



    app.get('/review/:guideId', async (req, res) => {


      const query = { guideId: req.params.guideId };
      // console.log(req.params.guideId)
      const result = await reviewCollection.find(query).toArray();
      // console.log(result)
      res.send(result)
    })


    app.post('/booking', async (req, res) => {
      const newPost = req.body;
      const result = await bookingCollection.insertOne(newPost);
      res.send(result)
    })
    app.get('/booking/:email', async (req, res) => {
      const email = req.params.email;
      const query = { Email: email };
      const result = await bookingCollection.find(query).toArray();
      // console.log(result)
      res.send(result)
    })




    // user collection
    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'user already exist' })
      }
      const result = await userCollection.insertOne(user);
      res.send(result)
    })


    app.get('/role/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const userRole = await userCollection.findOne(query);
      // console.log(email)
      res.send(userRole.role)
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