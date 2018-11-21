const TaskDao = require('../db/dao/TaskDao');

class TasksService {
	getAll(user) {
		return user.tasks;
	}

	createTask(req) {
		const task = {
			name: req.body.name,
			description: req.body.description,
			dueDate: req.body.dueDate
		};
		return (new TaskDao).create(req.user, task);
	}

	deleteTask(user, taskId) {
		return (new TaskDao).delete(user, taskId);
	}

	updateTask(req) {
		const data = {
			name: req.body.name,
			description: req.body.description,
			dueDate: req.body.dueDate
		};
		return (new TaskDao).update(req.user, req.params.id, data);
	}

	static isRequestValid(req, res, next) {
		if (req.params.id !== 'undefined' ) {
			return next();
		}

		res.status(400).json({error: 'Id wasn\'t provided'});
	}
}

module.exports = TasksService;