const { MongoClient } = require("mongodb");
require('dotenv').config({quiet: true});
const URI = process.env.URI
const client = new MongoClient(URI);

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);