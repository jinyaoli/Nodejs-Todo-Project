var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds155218.mlab.com:55218/todo');

//Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extend: false});
module.exports = function(app){

app.get('/todo', function(req, res){
  //get data from mongodb and pass it to the view
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render('todo', {todos: data});
  });

});

app.post('/todo',urlencodedParser ,function(req, res){
  //get data from the view and add it to database
  var newTodo = Todo(req.body).save(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

app.delete('/todo/:item', function(req, res){
  //delete the requested item from the database
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
    if (err) throw err;
    res.json(data);
  });
});

};
