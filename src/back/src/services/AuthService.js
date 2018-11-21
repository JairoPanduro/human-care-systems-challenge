const UserDao = require('../db/dao/UserDao');
const _ = require('lodash');

class AuthService {
	static async login(req, res) {
		const userDao = new UserDao();
		const user = await userDao.getUser(req.body.login, req.body.password);
		if (_.isEmpty(user)) {
			return res.stats(400).json({error: 'Login or password doesn\'t match!'});
		}

		return AuthService.prepareUserData(userDao, user);
	}

	static prepareUserData(userDao, user) {
		const token = userDao.getToken(user);
		const data = {...user._doc, token};
		delete data.password;

		return data;
	}

	static async isTokenValid(req) {
		if (req.get('Authorization')) {
			const token = req.get('Authorization').replace('Token ', '');
			const user = await (new UserDao).getUserByToken(token);
			if (user) {
				return user;
			}
		}

		return false;
	}

	static async isAuthenticated(req, res, next) {
		const user = await AuthService.isTokenValid(req);
		if (user) {
			req.user = user;
			return next();
		}

		res.json({error: 'This operation requires authorizarion'})
	}
}

module.exports = AuthService;