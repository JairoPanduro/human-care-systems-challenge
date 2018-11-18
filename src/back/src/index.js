const express = require('express');

// App
const app = express();
app.get('/', (req, res) => {
	res.send('Hello world\n');
});

app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);