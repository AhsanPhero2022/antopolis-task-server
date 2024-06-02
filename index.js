const express = require("express");
const cors = require("cors");

require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Configure MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xsh8x1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Configure multer for file uploads

async function run() {
  try {
    // await client.connect();

    const imagesCollection = client.db("allAnimals").collection("images");
    const categoryCollection = client.db("allAnimals").collection("category");

    app.post("/images", async (req, res) => {
      const newFrozen = req.body;
      try {
        const result = await imagesCollection.insertOne(newFrozen);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to insert image" });
      }
    });
    app.post("/category", async (req, res) => {
      const newFrozen = req.body;
      try {
        const result = await categoryCollection.insertOne(newFrozen);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to insert category" });
      }
    });

    app.get("/images", async (req, res) => {
      const images = await imagesCollection.find().toArray();
      res.send(images);
    });
    app.get("/category", async (req, res) => {
      const category = await categoryCollection.find().toArray();
      res.send(category);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); // Commented to keep the connection alive
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
