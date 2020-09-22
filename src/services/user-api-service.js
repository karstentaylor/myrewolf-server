import config from '../config';
import TokenService from './token-service';

const UserApiService = {
	getUsers() {
		return fetch(`${config.API_ENDPOINT}/api/user`, {
			headers: {
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	postUser(user) {
		return fetch(`${config.API_ENDPOINT}/api/user`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(user),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	// TO UPDATE PASSWORD ON USER PROFILE - ChangePasswordForm.js
	async updateUserPassword(user_id, user) {
		const res = await fetch(`${config.API_ENDPOINT}/api/user/${user_id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(user),
		});
		if (res.status === 204) {
			return {};
		} else {
			const json = await res.json();
			return { error: json.error };
		}
	},
	deleteUserById(userId) {
		return fetch(`${config.API_ENDPOINT}/api/user/${userId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		});
	},
};

export default UserApiService;
