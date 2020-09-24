import config from '../config';
import TokenService from './token-service';

const ApiService = {
	getUsers() {
		return fetch(`${config.API_ENDPOINT}/api/user`, {
			headers: {},
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
	updateUser(user_name, password) {
		return fetch(`${config.API_ENDPOINT}/auth/user`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(user_name, password),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	postReview(text, rating) {
		return fetch(`${config.API_ENDPOINT}/api/reviews`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify({
				text,
				rating,
			}),
		});
	},
	getQuestions() {
		return fetch(`${config.API_ENDPOINT}/api/discovery`, {
			headers: {},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	postAnswer(answer) {
		return fetch(`${config.API_ENDPOINT}/api/discovery`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify({
				answer,
			}),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
};

export default ApiService;
