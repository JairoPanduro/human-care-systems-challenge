const User = require('../models/User');

class TaskDao {
	update(user, id, data) {
		return User.findOneAndUpdate({_id: user.id, 'tasks._id' : id}, {$set: {'tasks.$': data}}, {new: true});
	}

	delete(user, id) {
		return User.update({_id: user.id}, {$pull: {tasks: {$elemMatch: {_id: id}}}});
	}

	create(user, data) {
		return User.findOneAndUpdate({_id: user.id}, {$push: {tasks: data}}, {new: true});
	}
}

module.exports = TaskDao;