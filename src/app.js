const express = require('express');
const cors = require('cors');

const router = require('./vote.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use('/', router);

// Handle unknown routes
app.use((req, res) => res.send(usage));

// Handle body-parser errors
app.use((err, req, res, next) => {
	if (err.type === 'entity.parse.failed') {
		return res.status(400).json({
			message: 'invalid data',
			errors: { body: 'is malformed' },
		});
	}
	next(err);
});

// Handle unexpected errors
app.use((err, req, res, next) => {
	res.status(500).json({
		message: 'something went wrong',
	});
});

module.exports = app;

const usage = `
<h1>Vote 
	<span>API</span>
</h1>
<div>
<p>POST /vote/:id/add</p>
<p>GET /vote/:id</p>
<p>GET /vote/update-ids</p>
</div>
<style>
h1 {
	font-family: "helvetica neue", "open sans", sans-serif;
	font-size: 6rem;
	font-weight: 100;
	color: #353535;
	margin: 0 0 1rem 0;
	padding: 0;
}
h1 span {
	color: #aeaeae;
}
div { 
	background-color: rgba(0,0,0,0.2);
	padding: 2rem
}
div p {
	font-family: Consolas,Monaco,andale mono,monospace;
	font-size: 4rem;
	color: #353535;
	margin: 0;
	padding: 0;
}
</style>
`;
