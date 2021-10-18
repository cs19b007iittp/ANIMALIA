//jshint esversion:6
// library
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")
const mongoose = require('mongoose')
// const bcrypt = require("bcrypt");

// Routers
// const NosigninRouter = require("./routes/nosignin_routes.js")

//middleware
app.set(cors());
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
app.use('*/css',express.static('public/css'));
app.use('*/js',express.static('public/js'));
app.use('*/images',express.static('public/images'));


// db connection

// const URI = 'mongodb+srv://devuser:devuser@cluster0.frefb.mongodb.net/Egate?retryWrites=true&w=majority'
// const URI = 'mongodb+srv://animalia:animalia@animalia.0kkan.mongodb.net/test';
// mongoose.connect(URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// })
// mongoose.connection.once('open', () => console.log("Database connection established"))
// mongoose.set('useFindAndModify',false);

//routes

// app.get("/", function(req, res){
//   let data = 0;
//   data = 0;
//   res.render('firstPage', {
//     data
//   });
// });


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/firstPage.html'));
});

app.get('/nosignin/homepage', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/nosignin/homepage/andhra_pradesh', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/timeline.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/stream1', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/stream1.html'));
});




app.get('/nosignin/homepage/andhra_pradesh/quiz', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/quiz.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/quiz/play', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/game.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/quiz/play/end', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/end.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/quiz/highscores', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/highscores.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/quiz/claim_reward', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/ar.html'));
});

// app.use("/nosignin", NosigninRouter);


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
