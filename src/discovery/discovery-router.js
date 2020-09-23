const express = require('express');
const DiscoveryService = require('./discovery-service');

const discoveryRouter = express.Router();
const jsonParser = express.json();

discoveryRouter
	.route('/')
	.get((req, res, next) => {
		DiscoveryService.getAllDiscovery(req.app.get('db'))
			.then((questions) => {
				res.json(questions);
			})
			.catch(next);
	})
	.post(jsonParser, (req, res, next) => {
		const { answer } = req.body;
		const newAnswer = { answer };

		for (const [key, value] of Object.entries(newAnswer)) {
			if (value == null) {
				return res.status(400).json({
					error: { message: `Missing '${key}' in request body` },
				});
			}
		}
		DiscoveryService.insertAnswer(req.app.get('db'), newAnswer)
			.then((answer) => {
				res.status(201).location(`/`).json(answer);
			})
			.catch(next);
	});

module.exports = discoveryRouter;
