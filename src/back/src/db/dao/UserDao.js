const crypto = require('crypto');
const User = require('../models/User');
const Connector = require('../Connector');
const config = require('../../config/default');

class UserDao {
	constructor(db) {
		this.db = db || Connector;
	}

	async getUser(login, password) {
		const hash = this.generatePasswordHash(password, config.passwordSecret);
		return User.findOne({name: login, password: hash});
	}

	async getUserByToken(token) {
		const users = await User.find();
		let userFound = null;
		users.forEach(user => {
			const signature = this.generateToken(user.password, config.apiSecret);
			if (token === signature) {
				userFound = user;
			}
		});

		return userFound;
	}

	getToken(user) {
		return this.generateToken(user.password, config.apiSecret);
	}

	generatePasswordHash(password, hash) {
		return this.generateToken(password, hash);
	}

	generateToken(password, hash) {
		const hmac = crypto.createHmac('SHA256', password + hash);
		return hmac.digest('hex');
	}
}

module.exports = UserDao;