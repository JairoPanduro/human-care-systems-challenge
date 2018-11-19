const express = require('express');
const AuthService = require('./services/AuthService');
const TasksService = require('./services/TasksService');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello world\n');
});

app.post('/login', (req, res) => {
	const user = (new AuthService).login(req, res);
	res.json(user);
});


app.get('/tasks', AuthService.isAuthenticated, (req, res) => {
	const tasks = (new TasksService).getAll(req.user);
	res.json(tasks);
});

app.post('/tasks', AuthService.isAuthenticated, (req, res) => {
	const tasks = (new TasksService).createTask(req.user, req.task);
	res.json(tasks);
});

app.put('/tasks/:id', AuthService.isAuthenticated, (req, res) => {
	const task = (new TasksService).updateTask(req.user, req.params.id, req.task);
	res.json(task);
});

app.delete('/tasks/:id', AuthService.isAuthenticated, (req, res) => {
	const task = (new TasksService).deleteTask(req.user, req.params.id);
	res.json(task);
});


app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);