// const { MongoClient } = require('mongodb');
// or as an es module:
 import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'test';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  const collection = db.collection('MOvies');
  collection.insertOne({name: 'Star Wars'});
  console.log('Inserted 1 document into the collection');
  console.log(collection)

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());