const getApiUrl = () => {
	if (process.env.REACT_APP_DOCKER_HOST && process.env.REACT_APP_HCS_BACK_PORT) {
		const backend = process.env.REACT_APP_DOCKER_HOST;
		const port = process.env.REACT_APP_HCS_BACK_PORT;
		return 'http://' + backend.replace('tcp://', '').replace(/:[0-9]*/, '') + ':' + port;
	}
	return ''
};

export default {
	apiUrl: getApiUrl()
}