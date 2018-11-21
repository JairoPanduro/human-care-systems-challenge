module.exports = {
	dbHost: process.env.DB_HOST || 'localhost',
	dbUser: process.env.DB_USER || 'root',
	dbPassword: process.env.DB_PASSWORD || '',
	dbPort: process.env.DB_PORT || 27017,
	dbName: process.env.DB_NAME || 'hcs',
	passwordSecret: 'ARNrTUXfJpbE7Gm3s2Ny79dY',
	apiSecret: 'YVheAAaTVSJsAJkSnMHKfu6D',
};