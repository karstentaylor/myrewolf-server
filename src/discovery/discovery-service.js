const xss = require('xss');

const discoveryService = {
	getAllDiscovery(knex) {
		return knex.select('*').from('discovery');
	},
	insertQuestion(knex, newQuestion) {
		return knex
			.insert(newQuestion)
			.into('discovery')
			.returning('*')
			.then((newQuestion) => {
				return newQuestion[0];
			});
	},
	getById(knex, id) {
		return knex.from('discovery').select('*').where('id', id).first();
	},
	deleteQuestion(knex, id) {
		return knex('discovery').where({ id }).delete();
	},
	updateQuestion(knex, id, newQuestionFields) {
		return knex('discovery').where({ id }).update(newQuestionFields);
	},
	insertAnswer(knex, newAnswer) {
		return knex
			.insert(newAnswer)
			.into('answers')
			.returning('*')
			.then((newAnswer) => {
				return newAnswer[0];
			});
	},
};

module.exports = discoveryService;
