const AdminService = {
	getAllUsers(db) {
		return db.select('*').from('users');
	},

	deleteUser(db, id) {
		return (
			db('users')
				.where({ id })
				//.where({ email })
				// 		db.raw(`id=${id}
				// and email=${email}`)
				// 	)
				.delete()
		);
	},
};

module.exports = AdminService;
