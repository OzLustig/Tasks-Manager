var express = require('express');
var router = express.Router();
var mongoose = require('../app');
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function(req,res) {
    res.render('register');
});

router.get('/login', function(req,res) {
    res.render('login3');
})

router.post('/register', function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var user = new User({username: username, email: email, password: password});
    user.save();
    console.log("Saved user successfully");
    res.render('login3');
});


router.get('/register/error', function(req,res) {
    res.render('register', {'failure': 'Wrong credentials'})
});

router.post('/login', function(req,res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({'username': username}, function (err, user) {
        if (err || !user) {
            console.log("Username wasn't found");
            res.redirect('/users/register/error');
        }
        else {
            var books = {"Oz": "Oz", "Eyal": "Eyal"};
            //if user was found.
            if (user.checkPassword(password)) {
                req.session.loggedInUsername = username;
                req.session.save(function (err) {
                    console.log("Sesseion saved");
                    res.redirect('/ideas')
                })
            }
            else {
                console.log("Password did not match");
                res.redirect('/users/register/error');
            }
        }
    });
});

module.exports = router;
