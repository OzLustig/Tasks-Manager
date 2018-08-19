var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/ideas');
});

router.get('/tasks/completed', function(req,res){
    var counter = 0;
    var done_Tasks = {};
    if (req.session.loggedInUsername == null)
        res.redirect('/users/register');
    else {
        Task.find({}, function (err, tasks) {
            if (err) {
                console.log(err);
            }
            return tasks;
        })
            .then(function (tasks) {
                tasks.forEach(function (task) {
                    if (task.username === req.session.loggedInUsername && task.done === true) {
                        console.log('adding task: '+task.title);
                        done_Tasks[counter++] = task;
                    }
                });
                return done_Tasks;
            })
            .then(function(done_tasks){
                res.render('tasks_completed', {title: 'Tasks Manager', tasks: done_Tasks});
            })
    }});
router.get('/ideas', function(req, res, next) {
    var counter = 0;
    var userSpecificTasks = {};
    if (req.session.loggedInUsername == null)
        res.redirect('/users/register');
    else {
        Task.find({}, function (err, tasks) {
            if (err) {
                console.log(err);
            }
        })
            .then(function(tasks){
                tasks.forEach(function (task) {
                    if (task.username === req.session.loggedInUsername)
                        userSpecificTasks [counter++] = task;
                })
                res.render('main', {title: 'Tasks Manager', tasks: userSpecificTasks });
            })
    }
})
router.post('/idea', function(req,res) {
    console.log("router.put('/idea'");
    var counter = 0;
    var tasks = {};
    if (req.session.loggedInUsername == null)
        res.redirect('/users/register');
    else {
        var username = req.session.loggedInUsername;
        var title = req.body.title;
        var body = req.body.body;
        var dueDate = req.body.bdate;
        console.log(dueDate);
        var task = new Task({username: username, title: title, body: body, done:false, dueDate: dueDate});
        task.save(function (err) {
            if (err){
                console.log(err);
                res.render('error',{error: err,message: 'Failed to create new idea'});
            }
            console.log("Saved idea successfully");
            res.redirect('/ideas');
        })
    }
})

router.post('/idea_completed/:id', function(req,res) {
    if (req.session.loggedInUsername == null)
        res.redirect('/users/register');
    else {
        var id = req.params.id;
        console.log(' task id='+id);
        Task.findOneAndUpdate({_id: id}, {$set:{done:true}}, {new: true}, function(err, doc) {
            if (err) {
                console.log(err);
                res.render('error', {error: err, message: 'Failed to update done element of +id'});
            }
            res.redirect('/ideas');
        })
    }
});

router.post('/idea_delete/:id', function(req,res) {
    console.log("delete request captured");
    if (req.session.loggedInUsername == null)
        res.redirect('/users/login');
    else
    {
        var id = req.params.id;
        console.log(' task id='+id);
        Task.remove({ _id: id }, function(err) {
            if (!err) {
                console.log('idea removed successfully');
                res.redirect('/ideas');
            }
        });
    }
})

module.exports = router;