var express = require('express');
var router = express.Router();
var Switchery = require('switchery');
//var elem = document.querySelector('.js-switch');
//var init = new Switchery(elem);
/*var app = express();*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express 2016XS' });
});

/* GET Hello World page. */
router.get('/basics', function(req, res, next) {
  res.render('basics', { title: 'Login Page' });
});

/* Get New Login Page*/
router.get('/login', function(req, res, next ){
  res.render('login', { title: 'Login Page'});
});

/*post login page to home page*/
router.post('/login', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    /* // Get our form values. These rely on the "name" attributes
     var loginName = req.body.user;
     var loginPwd = req.body.password;

     if(loginName == 'admin' && loginPwd == 'admin'){
     res.redirect("page");
     }
     else
     res.redirect("login");*/
    // Set our collection
    // Get our form values. These rely on the "name" attributes
    var loginName = req.body.user;
    var loginPwd = req.body.password;


    // Set our collection
    if(loginName != null && loginPwd != null) {
        var collection = db.get('credentials');

        console.log("collection", collection, loginName, loginPwd);


        //collection.find(logname);

        // Submit to the DB
        collection.insert({
            "logname": loginName,
            "logpwd": loginPwd

        }, function (err, doc) {
            if (err) {
                res.redirect("login");
                // If it failed, return error
                /* res.send("There was a problem adding the information to the database.");
                 console.log("err", err);*/
            }
            else {
                // And forward to success page
                console.log("success", doc);
                res.redirect("page");

            }
        });
    }
});


/* Get Change Pwd Page*/
router.get('/changepwd', function(req, res, next ){
    res.render('Changepwd', { title: 'Change Password'});
});

/*post save changes to the new pwd*/
router.post('/changepwd', function(req, res){
    var db =req.db;

    var loginName = req.body.user;
    var newPwd = req.body.pwd;
    var rePwd = req.body.re_pwd;

    console.log(newPwd);
    console.log(rePwd);

    // Set our collection
    var collection = db.get('credentials');
    console.log("collection", collection ,loginName, newPwd );
    if(newPwd == rePwd){
        console.log("matched");
        collection.update({
            "logname" : loginName
            },{
                $set: { "logpwd": rePwd}
            },function (err, doc) {
            console.log("pwd reset successfully");
            if (err) {
                res.redirect("changepwd");
                // If it failed, return error
               // res.send("There was a problem adding the information to the database.");
                 //console.log("err", err);
            }
            else {
                // And forward to success page
               console.log("pwd reset successfully",doc);
                res.redirect("login");

            }
        });
    }
    else{
        console.log("passwords doesn't match");
        res.redirect("changepwd");
    }

});



/*get 2nd page*/
router.get('/page', function(req, res, next) {
  res.render('page', { title: 'Home Page' });
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
