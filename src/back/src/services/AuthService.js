class AuthService {
	login(req, res) {

	}

	static isAuthenticated(req, res, next) {
		if (true) {
			return next();
		}

		res.json({error: 'This operation requires authorizarion'})
	}
}

module.exports = AuthService;