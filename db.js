const mongoose= require("mongoose");

const mongoURL= 'mongodb://localhost:27017/hotels'

const Person = require('./models/person');
const bodyParser = require("body-parser");


// this is default line we have to write for new making new connection 
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db = mongoose.connection;  // here connection got established

// for user message that connection is established
// connected , error,  disconnected  these all are event listener keywords  
db.on('connected', ()=>{
    console.log("Connected to MongoDB server ")
})
db.on('error', (err)=>{
    console.log("Error while connecting to MongoDB server "+ err);
})
db.on('disconnected', ()=>{
    console.log(" MongoDB server disconnected")
})
