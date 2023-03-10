require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;  
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');



// const uri = "mongodb+srv://kwilliams31:9MVfWqRjRU3DvosT@cluster0.fmwwnxu.mongodb.net/?retryWrites=true&w=majority";

//connecting to his db
// const uri = "mongodb+srv://barry:nb3amjtQWhSN6ibH@cluster0.taug6.mongodb.net/?retryWrites=true&w=majority"; 

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

async function cxnDB(){

  try{
    client.connect; 
    const collection = client.db("papa-lab").collection("dev-profiles");

    // const collection = client.db("papa").collection("dev-profiles");
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


app.get('/', async (req, res) => {
  //res.send('his this is she! <br/> <a href="mongo">mongo</a>');

  let result = await cxnDB().catch(console.error); 

  res.render('index', {
  nameData : result
  });
})

app.get('/mongo', async (req, res) => {

  // res.send("check your node console, bro");

  let result = await cxnDB().catch(console.error); 

  console.log('in get to slash mongo', result[2].name); 

  res.send(`here ya go, joe. ${ result[2].name }` ); 

})

app.get('/update', async (req, res) => {

    // want to get data from the form
    console.log("in get to slash update:", req.query.ejsFormName); 
    myName = req.query.ejsFormName; 

    // update into the db
    client.connect; 
    const collection = client.db("papa-lab").collection("dev-profiles");

    await collection.insertOne({
      name: "Joe"
    });
})


app.post('/addName', async (req, res) => {

  try {
    // console.log("req.body: ", req.body) 
    client.connect; 
    const collection = client.db("papa-lab").collection("dev-profiles");
    await collection.insertOne(req.body);
      
    res.redirect('/');
  }
  catch(e){
    console.log(error)
  }
  finally{
   // client.close()
  }

})

app.post('/deleteName/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("papa-lab").collection("dev-profiles");
    let result = await collection.findOneAndDelete( 
      {
        "_id": new ObjectId(req.params.id)
      }

    )
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

})

app.post('/updateName/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("papa-lab").collection("dev-profiles");
    let result = await collection.findOneAndUpdate( 
      { "_id": new ObjectId(req.params.id) }, {$set: {name: "new name" }} )

    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

})



console.log('in the node console');

app.listen(PORT, () => {
  console.log(`Example app listening on port ${ PORT }`)
})