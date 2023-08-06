const express=require("express");
const path=require("path");
// const bodyparser=require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactdance',{useNewUrlParser: true, useUnifiedTopology: true});
const app=express()
const port=80



const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    more: String
  });
  const contact= mongoose.model('contact',contactSchema);

const loginSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

  const login= mongoose.model('login',loginSchema);






//   app.use(express.static('static',options))
  //for serving static files
app.use('/static',express.static('static'));
app.use(express.urlencoded())

//set the template engine as pug
app.set('view engine','pug');

//set the views directory
app.set('views',path.join(__dirname,'views'));

//end point
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
})

app.get('/login',(req,res)=>{
    res.status(200).render('login.pug');
})





app.post('/contact',(req,res)=>{
var mydata = new contact(req.body);
mydata.save().then(()=>{
    res.send("The data has been saved to the database")
}).catch(()=>{
    res.status(400).send("The data has not been saved to the database")
});
})


app.post('/login',(req,res)=>{
var mydata = new login(req.body);
mydata.save().then(()=>{
    res.send("The data has been saved to the database")
}).catch(()=>{
    res.status(400).send("The data has not been saved to the database")
});
})

app.listen(port,()=>{
    console.log(`server is sucessfully run ${port}` )
 })