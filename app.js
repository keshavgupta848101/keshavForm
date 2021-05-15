const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/formData', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Db connected");
}).catch((e)=>{
    console.log("Error while connecting Db");
});

const userData = mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    mob:Number,
    msg:String
})

const Userinfo = mongoose.model('Userinfo',userData);

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', (req,res)=>{
    res.render('index')
});

app.get('/result', async(req,res)=>{
    const userdataFound = await Userinfo.find({});
console.log(userdataFound);
    res.render('result',{userdataFound});
})

app.post('/', async(req,res)=>{

    // console.log(req.body);

    const {fname,lname,email,mob,msg}  = req.body;
    const result = await Userinfo.create({fname,lname,email,mob,msg});
    res.redirect('result');
});

app.listen(3000, ()=>{
    console.log("Server running on 3000");
})