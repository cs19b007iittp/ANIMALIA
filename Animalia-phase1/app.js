//jshint esversion:6
// library
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
// TODO: const bcrypt = require("bcrypt");

// TODO: Routers
// const NosigninRouter = require("./routes/nosignin_routes.js")

// Google Auth section
const {
  OAuth2Client
} = require('google-auth-library');
const CLIENT_ID = '11991105992-0e8j5o36d69cpaaffhtsagdjkbjdl6sm.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

const PORT = process.env.PORT || 3000;

//middleware section
app.set(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.set('view engine', 'ejs');


// making path global(server-wise)
app.use('*/css', express.static('public/css'));
app.use('*/js', express.static('public/js'));
app.use('*/images', express.static('public/images'));

//variable section
let user;
let check;

// redirecting section
app.get('/', function(req, res) {
  res.render('firstPage');
});

app.post('/', (req, res) => {
  let token = req.body.token;

  console.log(token);

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload);
  }
  verify()
    .then(() => {
      res.cookie('session-token', token);
      res.send('success');
    }).
  catch(console.error);
})

app.get('/signin/homepage', checkAuthenticated, (req, res) => {
  user = req.user;
  check = 1;
  res.render('index', {
    user,
    check
  });
})

app.get('/signin/bonus', checkAuthenticated, (req, res) => {
  let ran = getRandomInt(3);
  console.log(ran);
  if (ran === 1) {
    res.render('land_animals_ar');
  } else if (ran === 2) {
    res.render('birds_ar');
  } else {
    res.render('fishes_ar');
  }
})

app.get('/nosignin/homepage', function(req, res) {
  check = 0;
  res.render('index', {
    user,
    check
  });
});

app.get('/nosignin/homepage/andhra_pradesh', function(req, res) {
  res.render('timeline', {
    user,
    check
  });
});

// Time streams redirection

app.get('/nosignin/homepage/andhra_pradesh/stream1', function(req, res) {
  // res.sendFile(path.join(__dirname, 'views/stream1.html'));
  res.sendFile(path.join(__dirname, 'views/period1971.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/stream2', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/period1981.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/stream3', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/period1991.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/stream4', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/period2001.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/stream5', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/period2011.html'));
});


// quiz redirection

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

app.get('/downloadmarker', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/download_marker.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/quiz/claim_reward', function(req, res) {
  let ran = getRandomInt(5);
  console.log(ran);
  if (ran === 1) {
    res.sendFile(path.join(__dirname, 'views/ar.html'));
  } else if (ran === 2) {
    res.render('tiger_ar');
  } else if (ran === 3) {
    res.render('chameleon');
  } else {
    res.render('elephant_ar');
  }
});

// chech authentication function

function checkAuthenticated(req, res, next) {
  let token = req.cookies['session-token'];

  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    user.name = payload.name;
    user.email = payload.email;
    user.picture = payload.picture;
  }
  verify()
    .then(() => {
      req.user = user;
      next();
    }).
  catch(err => {
    res.redirect('/login');
  });
}

// random number generator function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
