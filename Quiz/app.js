//jshint esversion:6
// library
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")


//middleware
app.set(cors());
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
app.use('*/css',express.static('public/css'));
app.use('*/js',express.static('public/js'));
app.use('*/images',express.static('public/images'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/play', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/game.html'));
});

app.get('/play/end', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/end.html'));
});

app.get('/highscores', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/highscores.html'));
});

// app.use("/nosignin", NosigninRouter);


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
