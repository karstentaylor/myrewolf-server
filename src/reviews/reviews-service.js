const xss = require('xss');

const ReviewsService = {
	insertReview(db, newReview) {
		return db
			.insert(newReview)
			.into('reviews')
			.returning('*')
			.then(([row]) => row[0]);
		// .then((review) => ReviewsService.getById(db, review.user_id));
	},

	serializeReview(review) {
		return {
			id: review.id,
			rating: review.rating,
			text: xss(review.text),
			date_created: review.date_created,
			user: review.user || {},
		};
	},
};

module.exports = ReviewsService;
