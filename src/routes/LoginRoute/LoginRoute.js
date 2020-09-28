import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import UserContext from '../../contexts/UserContext';
import './LoginRoute.css';

class LoginRoute extends Component {
	static defaultProps = {
		location: {},
		history: {
			push: () => {},
		},
	};

	static contextType = UserContext;

	handleLoginSuccess = () => {
		const { location, history } = this.props;
		const destination = (location.state || {}).from || '/home';
		history.push(destination);
	};

	render() {
		return (
			<section className="LoginPage">
				<div className="LoginHeader">
					<h2>Log In</h2>
					<p>You may login using the demo credentials of...</p>
					<p>E-mail: test@test.com Password: Testuser1! </p>
					<p>For admin access: admin@admin.com Password: Adminpass1!</p>
				</div>
				<LoginForm onLoginSuccess={this.handleLoginSuccess} />
			</section>
		);
	}
}

export default LoginRoute;
