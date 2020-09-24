const knex = require('knex');
const { expect } = require('chai');
const { getAllDiscovery } = require('../src/discovery/discovery-service');
const testDiscovery = require('../test/discovery.fixtures');

describe('Discovery questions', function () {
	let db;
	before(() => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DATABASE_URL,
		});
	});
	before(() => db('discovery').truncate());

	afterEach(() => db('discovery').truncate());

	after(() => db.destroy());

	context(`Given 'discovery' has data`, () => {
		beforeEach(() => {
			return db.into('discovery').insert(testDiscovery);
		});
		it(`getAllDiscovery() resolves all questions from 'discovery' table`, () => {
			return getAllDiscovery(db).then((actual) => {
				expect(actual).to.eql(
					testDiscovery.map((question) => ({
						...question,
						date_added: new Date(question.date_added),
					}))
				);
			});
		});
	});
	context(`Given 'discovery' has no data`, () => {
		it(`getAllDiscovery() resolves an empty array`, () => {
			return getAllDiscovery(db).then((actual) => {
				expect(actual).to.eql([]);
			});
		});
	});
});
