//jshint esversion:6
// library
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser')

//variable section
let user;
let check;
let email;
let id = 0;
let curr_imagePath;
let name1 = "Ruthvik";
let email1 = "ruthvik@gmail.com";
let imagePath1 = "images/ruthvik.png";
let imagePath2 = "images/greeshmitha.jpeg";
let imagePath3 = "images/rithika.jpeg";
let imagePath4 = "images/suman.jpeg";

// TODO: Routers
// const NosigninRouter = require("./routes/nosignin_routes.js")

const Customer = require('./models/customer.model')

//middleware section
app.set(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.set('view engine', 'ejs');


//connect with db
mongoose.connect('mongodb+srv://animalia-team11:1URdYyRpqDEKEuDT@cluster0.txx4c.mongodb.net/test', {
  useNewUrlParser: true
});

mongoose.connection.once('open', function() {
  console.log('connection has been made');
}).on('error', function(error) {
  console.log('error is:', error);
})


// Database Connection
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://animalia-team11:1URdYyRpqDEKEuDT@cluster0.txx4c.mongodb.net/test";
// const clients = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// console.log('Connected to Atlas');
// clients.connect(err => {
//   const collection = clients.db("Animalia").collection("customer");
//   // perform actions on the collection object
//   clients.close();
// });

// Google Auth section
const {
  OAuth2Client
} = require('google-auth-library');
const CLIENT_ID = '11991105992-0e8j5o36d69cpaaffhtsagdjkbjdl6sm.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

const PORT = process.env.PORT || 3000;


// making path global(server-wise)
app.use('*/css', express.static('public/css'));
app.use('*/js', express.static('public/js'));
app.use('*/images', express.static('public/images'));
app.use('*/audios', express.static('public/audios'));

// redirecting section
app.get('/', function(req, res) {
  check = 0;
  id = 0;
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
  let username = user.username;
  email = user.email;
  console.log(username, email);

  Customer.findOne({
    email
  }, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (!doc) {
      console.log('Student details unavailable');
      const studentData = new Customer({
        username: username,
        email: email,
        id: 0
      })
      studentData.save(function(err, book) {
        if (err) return console.log(err);
        console.log("new student" + studentData.username + "created");
        res.render('state_selection', {
          user,
          check
        });
      })
    } else {
      console.log('Student already exists');
      res.render('state_selection', {
        user,
        check
      });
    }
  })
})


app.post('/signin/homepage', (req, res) => {})

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
  res.render('state_selection', {
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

app.get('/nosignin/homepage/andhra_pradesh/instructions', function(req, res) {
  // res.sendFile(path.join(__dirname, 'views/stream1.html'));
  res.sendFile(path.join(__dirname, 'views/instructionsPage.html'));
});

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
  // res.sendFile(path.join(__dirname, 'views/test.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/quiz/play', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/game.html'));
});

app.get('/nosignin/homepage/andhra_pradesh/quiz/play/end', function(req, res) {
  // res.sendFile(path.join(__dirname, 'views/end.html'));
  res.render('end', {
    check
  });
});

app.get('/nosignin/homepage/andhra_pradesh/quiz/claim_reward', function(req, res) {
  let ran = getRandomInt(5);
  console.log(ran);
  if (ran === 1) {
    res.render('ar1');
  } else if (ran === 2) {
    res.render('ar2');
  } else if (ran === 3) {
    res.render('elephant_ar');
  } else {
    res.render('ar4');
  }
});

app.get('/nosignin/homepage/andhra_pradesh/quiz/highscores', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/highscores.html'));
});

app.get('/downloadmarker', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/download_marker.html'));
});

app.get('/signin/homepage/andhra_pradesh/quiz/claim_reward', function(req, res) {


  Customer.findOne({
    email
  }, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (!doc) {
      console.log('Student details unavailable');
    } else {
      console.log('Student found');
      id = doc.id;
      console.log('Before id: ' + id);
      if (id < 4) {
        // incrementing image
        id = id + 1;
        console.log('After id: ' + id);
        // updating id in database
        Customer.findOneAndUpdate({
          "email": email
        }, {
          "$set": {
            "id": id
          }
        }).exec(function(err, book) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            console.log('Id updated');
            console.log('image path: ' + curr_imagePath);
            res.redirect('/collections');
          }
        });
      } else {
        console.log('All rewards collected');
        res.render('collection', {
          id
        });
      }
    }
  })

});

app.get('/signin/ar1', function(req, res) {
  res.render('ar1');
})

app.get('/signin/ar2', function(req, res) {
  res.render('ar2');
})

app.get('/signin/ar3', function(req, res) {
  res.render('elephant_ar');
})

app.get('/signin/ar4', function(req, res) {
  res.render('ar4');
})

// app.get('/signin/homepage/andhra_pradesh/quiz/dummy', function(req, res){
//   // person.tags.push(curr_link);
//
// });

app.get('/uploadBadge', function(req, res) {

  Customer.findOne({
    email
  }, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (!doc) {
      console.log('Student details unavailable');
    } else {
      console.log('Student found');
      id = doc.id;
      console.log('Before id: ' + id);
      if (id <= 4) {
        // incrementing image
        id = id + 1;
        console.log('After id: ' + id);
        // updating id in database
        Customer.findOneAndUpdate({
          "email": email
        }, {
          "$set": {
            "id": id
          }
        }).exec(function(err, book) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            console.log('Id updated');
            console.log('image path: ' + curr_imagePath);
            res.redirect('/collections');
          }
        });
      } else {
        console.log('All rewards collected');
        res.render('collection', {
          id
        });
      }
    }
  })

});

app.get('/view_collections', function(req, res) {
  console.log("Iam in view collections");
  Customer.findOne({
    email
  }, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (!doc) {
      console.log('Student details unavailable');
    } else {
      console.log('Student found');
      id = doc.id;
      console.log('Before id: ' + id);
      res.render('collection', {
        id
      });
    }
  })
})

// collections
app.get('/collections', function(req, res) {
  console.log("Iam in collections");
  Customer.findOne({
    email
  }, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (!doc) {
      console.log('Student details unavailable');
    } else {
      console.log('Student found');
      id = doc.id;
      console.log('Before id: ' + id);
      // if (id > 4) {
      //   console.log('All rewards collected');
      //   res.render('collection', {
      //     id
      //   });
      // } else {
      //   console.log('id: '+id);
      //   res.render('collection', {
      //     id
      //   });
      // }
      if (id == 1) {
        res.redirect('/signin/ar1');
      } else if (id == 2) {
        res.redirect('/signin/ar2');
      } else if (id == 3) {
        res.redirect('/signin/ar3');
      } else if (id == 4) {
        res.redirect('/signin/ar4');
      }
    }
  })
})

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
  // console.log(`
  //               Server running on port $ {
  //                 PORT
  //               }
  //               `);

  console.log("Server started on port 3000.");
})
