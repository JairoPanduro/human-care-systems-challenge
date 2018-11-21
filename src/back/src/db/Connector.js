const mongoose = require('mongoose');
const config = require('../config/default');

class Connector {
	constructor(settings) {
		this.connection = this.setConnection(settings);
	}

	setConnection(settings) {
		if (!this.connection) {
			mongoose.connect(
				`mongodb://${settings.dbHost}:${settings.dbPort}/${settings.dbName}`,
				{useNewUrlParser: true}
			);

      if (process.env.NODE_ENV === 'dev') {
				mongoose.set('debug', true);
      }

			this.connection = mongoose.connection;
			this.setOptions();
		}

		return this.connection;
	};

	getConnection() {
		return this.connection;
	}

	setOptions() {
		this.connection.on('error', (err) => console.error(err));
		this.connection.once('open', () => console.info('Connection to MongoDB established'));
	}

}

const connector = (new Connector(config));

module.exports = connector;