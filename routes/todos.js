var express = require('express');
var  ToDo  = require('../models/ToDo');
var router = express.Router();

router.get('/', async function(req, res, next) {
//  ToDo.find((err, data) => {
//         res.render('list-todos', { title: 'ToDo List', todos: data });
//     });

  let todos = await ToDo.find();
  res.render('list-todos', { title: 'ToDo List', todos: todos });

});

router.get('/add', function(req, res, next) {
    res.render('add-todo', { title: 'Add ToDo' });
});


router.get('/update/:id', async function(req, res, next) {
    let todo = await ToDo.findById(req.params.id);
    res.render('update-todo', { todo: todo });
});

router.get('/productivity', function(req, res, next) {
    res.render('productivity', { title: 'Productivity' });
});

router.post('/', function(req, res, next) {
    let toDo = new ToDo(req.body);
    toDo.save((err, data) => {
        if(err) console.log(err);
        console.log(data);

        ToDo.find((err, data) => {
            res.render('list-todos', { title: 'ToDo List', todos: data });
        });
    });
   
});

router.post('/update', async function(req, res, next) {
    let toDo = await ToDo.findById(req.body.id);
    await toDo.update(req.body);
    let todos = await ToDo.find();
    res.render('list-todos', { title: 'ToDo List', todos: todos });
});

router.get('/delete/:id', async function(req, res, next) {
    let toDo = await ToDo.findByIdAndDelete(req.params.id);
    let todos = await ToDo.find();
    res.render('list-todos', { title: 'ToDo List', todos: todos });
});

router.get('/done/:id', async function(req, res, next) {
    let toDo = await ToDo.findById(req.params.id);
    await toDo.update({status:"done"});
    let todos = await ToDo.find();
    res.render('list-todos', { title: 'ToDo List', todos: todos });
});

module.exports = router;
