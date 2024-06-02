const express = require("express");
const cors = require("cors");
const multer = require("multer");
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
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function run() {
  try {
    await client.connect();
    
    const imagesCollection = client.db("allAnimals").collection("images");

   

    // Endpoint to handle image uploads
    app.post("/upload-image", upload.single('file'), async (req, res) => {
      const file = req.file;
      if (!file) {
        return res.status(400).send({ message: 'No file uploaded' });
      }

      const newImage = {
        imageName: file.originalname,
        data: file.buffer,
        contentType: file.mimetype,
      };

      const result = await imagesCollection.insertOne(newImage);
      res.send({ message: 'Image uploaded successfully', result });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
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
