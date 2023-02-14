const express = require('express')
const app = express()
const port = 3000


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kwilliams31:<password>@cluster0.fmwwnxu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log('before connection');

client.connect(err => {
    console.log('in connect method');
  const collection = client.db("test").collection("devices");

  console.log('decl collection');
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

console.log('in the node console');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})