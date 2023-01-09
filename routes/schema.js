const mongodb=require('mongodb')
const mongoose = require("mongoose")
const { Schema } = mongoose;
const dotenv=require('dotenv')
dotenv.config()

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});
const cloudSchema= new Schema({
    name:String,
    image:String,
    cloud_id:String
})

 const Cloud=  mongoose.model('cloud',cloudSchema) 
module.exports= Cloud