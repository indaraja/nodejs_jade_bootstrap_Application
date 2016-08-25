var express = require('express');
var router = express.Router();
/*var app = express();*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express 2016' });
});

/* GET Hello World page. */
router.get('/basics', function(req, res, next) {
  res.render('basics', { title: 'Login Page' });
});

/* Get New Login Page*/
router.get('/login', function(req, res, next ){
  res.render('login', { title: 'Login'});
});

/*get 2nd page*/
router.get('/page', function(req, res, next) {
  res.render('page', { title: 'Hello, World!' });
});


/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('workingdir');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});



/* POST to Add User Service */
router.post('/adduser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.usrname;
  var userPwd = req.body.pwd;
  var userloc = req.body.loc;

  // Set our collection
  var collection = db.get('workingdir');
  console.log("collection", collection, userName, userPwd, userloc);

  // Submit to the DB
  collection.insert({
    "usrname" : userName,
    "pwd" : userPwd,
    "loc" : userloc
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
      console.log("err", err);
    }
    else {
      // And forward to success page
      console.log("success", doc);
      res.redirect("userlist");

    }
  });
});

//add user for sample
router.get('/adduser', function(req, res, next) {
  res.render('adduser', { title: 'Add User' });
});

module.exports = router;
