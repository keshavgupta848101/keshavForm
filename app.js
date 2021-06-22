const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/keshavform', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Db connected");
}).catch((e)=>{
    console.log("Error while connecting Db");
});

const userData = mongoose.Schema({
    firstQus:String,
    list1:String,
    secondQus:String,
    list2: String,
    thirdQus:String,
    list3: String,
    fourthQus:String,
    list4: String,
    fifthQus:String,
    list5: String
})
const FormQus = mongoose.model('FormQus',userData);


const userAnswer = mongoose.Schema({
    firstAns:String,
    secondAns: String,
    thirdAns: String,
    fourthAns: String,
    fifthAns: String
});
const FormAns = mongoose.model('FormAns', userAnswer)

app.set('view engine', 'ejs');
app.use(express.static('public'))

let qusSet = {};
// Show from to set qus
app.get('/', (req,res)=>{
    res.render('formsQus')
})
// set forms qus to real form
app.post('/', async (req, res) => {
    const { firstQus, list1, secondQus, list2, thirdQus, list3, fourthQus, list4, fifthQus, list5 } = req.body;
    qusSet = await FormQus.create({ firstQus, list1, secondQus, list2, thirdQus, list3, fourthQus, list4, fifthQus, list5 });
    res.render('form', { qusSet });
});


//Show form result after fetching from mongodb
app.get('/result', async(req,res)=>{
    const ansSet = await FormAns.find({});
    const qusSet1 = await FormQus.find({})
    // console.log(qusSet);
    res.render('result', { ansSet, qusSet1});
})




//Show form with questions
app.get('/form', async (req, res) => {
    // console.log(qusSet);
    res.render('form', { qusSet })
});

app.post('/form', async(req,res)=>{

    const { firstAns, secondAns, thirdAns, fourthAns, fifthAns } = req.body;

    const ansSet = await FormAns.create({ firstAns, secondAns, thirdAns, fourthAns, fifthAns })
    // console.log(typeof(ansSet));
    res.redirect('result')

})




app.listen(3000, ()=>{
    console.log("Server running on 3000");
})