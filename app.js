require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;  
const bodyParser = require('body-parser')


const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const uri = "mongodb+srv://kwilliams31:<password>@cluster0.fmwwnxu.mongodb.net/?retryWrites=true&w=majority";


app.use(bodyParser.urlencoded({ extended: true }))

async function cxnDB(){

  try{
    client.connect; 
    const collection = client.db("papa").collection("dev-profiles");
    const result = await collection.find().toArray();
    //const result = await collection.findOne(); 
    console.log("cxnDB result: ", result);
    return result; 
  }
  catch(e){
      console.log(e)
  }
  finally{
    client.close; 
  }
}


app.get('/', (req, res) => {
  res.send('his this is she! <br/> <a href="mongo">mongo</a>');
})

app.get('/mongo', async (req, res) => {

  // res.send("check your node console, bro");

  let result = await cxnDB().catch(console.error); 

  console.log('in get to slash mongo', result[1].drink_name); 

  res.send(`here ya go, joe. ${ result[1].drink_name }` ); 

})

console.log('in the node console');

app.listen(PORT, () => {
  console.log(`Example app listening on port ${ PORT }`)
})