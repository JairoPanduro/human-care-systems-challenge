const express = require('express');
const cors = require('cors');
const AuthService = require('./services/AuthService');
const TasksService = require('./services/TasksService');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
	res.send('Hello world\n');
});

app.post('/login',  async (req, res) => {
	const user = await AuthService.login(req, res);
	res.status(201).json(user);
});

app.get('/tasks', AuthService.isAuthenticated, (req, res) => {
	const tasks = (new TasksService).getAll(req.user);
	res.json(tasks);
});

app.post('/tasks', AuthService.isAuthenticated, async (req, res) => {
	const user = await (new TasksService).createTask(req);
	res.status(201).json(user.tasks.pop());
});

app.put('/tasks/:id',
	AuthService.isAuthenticated,
	TasksService.isRequestValid,
	async (req, res) => {
		const user = await (new TasksService).updateTask(req);
		res.json(user);
});

app.delete('/tasks/:id', AuthService.isAuthenticated, TasksService.isRequestValid, (req, res) => {
	(new TasksService).deleteTask(req.user, req.params.id);
	res.status(202).send();
});


app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);