const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')


// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// MongoBD is Connection


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://admin:xOwYr6lEwpR1OzQW@cluster0.g5rlw.mongodb.net/?appName=Cluster0";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    //create a collections of document
    const inventoryCollections = client.db("ahmsInventory").collection("Medications");

    // insert medicine to the db : post method

    app.post("/update-inventory", async(req, res) => {
        const data = req.body;
        const result = await inventoryCollections.insertOne(data);
        res.send(result)
    })


    // get all the data

    app.get("/all-items", async(req, res) => {
      const items = inventoryCollections.find()
      const result = await items.toArray();
      res.send(result);

    })

    // update a item data : patch or post or update method

    app.patch("/inventory/:id", async(req, res) => {
      const id = req.params.id;
      console.log(id);
      const updateItemData = req.body;

      const filter = {_id: new ObjectId(id)}
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})