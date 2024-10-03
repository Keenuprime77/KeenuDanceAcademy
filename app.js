const express = require("express");
const path = require('path');
const app = express();
const  mongoose = require('mongoose');
const bodyParser = require("body-parser");
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.tazvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
const port = 8000;

//DEFINE MONGO SCHEMA
var contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
});


var Contact = mongoose.model('Contact',contactSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyparser.json());
//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//ENDPOINTS
app.get('/',(req,res)=>{
  
    const params= {}
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
  
    const params= {}
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })
    
})

//START THE SERVER
app.listen(port, ()=> {
    console.log(`the application started succesfully on port ${port}`)
});
