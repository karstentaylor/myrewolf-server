import React, { Component } from 'react';
import '../../components/App/App.css';
import Welcome from '../../components/Welcome/Welcome';

class WelcomeRoute extends Component {
	render() {
		return (
			<section className="container">
				<h2>Welcome</h2>
				<h3 className="tagline">
					This app was designed for a creative agency. It allows them to focus
					their work on their clients' and potential clients' needs. When a free
					account is created you will have access to a discovery form that will
					allow you to answer a questionnaire. These questions are designed so
					Rewolf may assess your needs.
				</h3>
				<Welcome />
			</section>
		);
	}
}

export default WelcomeRoute;
