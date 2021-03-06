var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	app = express(),
	toDos = [
		{
		"description" : "Купить продукты",
		"tags" : [ "шопинг", "рутина" ]
		},
		{
		"description" : "Сделать несколько новых задач",
		"tags" : [ "писательство", "работа" ]
		},
		{
		"description" : "Подготовиться к лекции в понедельник",
		"tags" : [ "работа", "преподавание" ]
		},
		{
		"description" : "Ответить на электронные письма",
		"tags" : [ "работа" ]
		},
		{
		"description" : "Вывести Грейси на прогулку в парк",
		"tags" : [ "рутина", "питомцы" ]
		},
		{
		"description" : "Закончить писать книгу",
		"tags" : [ "писательство", "работа" ]
		}
	];
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());
mongoose.connect('mongodb://localhost/amazeriffic');
var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [ String ]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);
http.createServer(app).listen(3000);
app.get("/todos.json", function (req, res) {
	ToDo.find({}, function (err, toDos) {
		res.json(toDos);
	});
});
app.post("/todos", function (req, res) {
	console.log(req.body);
	var newToDo = new ToDo({
		"description":req.body.description,
		"tags":req.body.tags
	});
	newToDo.save(function (err, result) {
		if (err !== null) {
			console.log(err);
			res.send("ERROR");
		} else {
			console.log("err == null");
			ToDo.find({}, function (err, result) {
				if (err !== null) {
					res.send("ERROR");
				}
				res.json(result);
			});
		}
	});
});
