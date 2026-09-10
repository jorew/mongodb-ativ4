const { MongoClient } = require("mongodb");
require('dotenv').config({quiet: true});
const URI = process.env.URI
const client = new MongoClient(URI);

async function findListings(client, resultsLimit) {
  const cursor = client.db('sample_airbnb')
    .collection('listingsAndReviews')
    .find()
    .limit(resultsLimit);
  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} listing(s):`);
    results.forEach((result, i) => {
      console.log(`\n${i + 1}. Name: ${result.name}`);
      console.log(`   Bedrooms: ${result.bedrooms}`);
      console.log(`   Bathrooms: ${result.bathrooms}`);
    });
  }
}

async function main() {
   await client.connect();
   await findListings(client, 3);
   await client.close();
}

main().catch(console.error);