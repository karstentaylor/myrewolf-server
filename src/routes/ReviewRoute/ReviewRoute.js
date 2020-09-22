import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import { Button, Textarea } from '../../components/Utils/Utils';
import './ReviewRoute.css';
import UserContext from '../../contexts/UserContext';

export default class Review extends Component {
	static contextType = UserContext;

	static defaultProps = {
		location: {},
		history: {
			push: () => {},
		},
	};

	renderHomePage = () => {
		const { location, history } = this.props;
		const destination = (location.state || {}).from || '/home';
		history.push(destination);
	};

	handleSubmit = (ev) => {
		ev.preventDefault();
		const { text, rating } = ev.target;

		ApiService.postReview(text.value, Number(rating.value))
			.then(() => {
				text.value = '';
			})
			.then(() => {
				this.renderHomePage();
			})
			.catch(this.context.setError);
	};

	render() {
		return (
			<form className="ReviewForm" onSubmit={this.handleSubmit}>
				<div className="text">
					<Textarea
						required
						aria-label="Type a review..."
						name="text"
						id="text"
						cols="30"
						rows="3"
						placeholder="Type review..."
					></Textarea>
				</div>

				<div className="select">
					<label htmlFor="rating">Rate our services</label>
					<select
						required
						aria-label="Rate our services!"
						name="rating"
						id="rating"
					>
						<option value="5">5 Stars</option>
						<option value="4">4 Stars</option>
						<option value="3">3 Stars</option>
						<option value="2">2 Stars</option>
						<option value="1">1 Star</option>
					</select>
				</div>
				<div className="Submit-btn">
					<Button type="submit">Review Rewolf!</Button>
				</div>
			</form>
		);
	}
}
