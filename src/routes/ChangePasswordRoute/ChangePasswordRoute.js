import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm';

class ChangePasswordRoute extends Component {
	static defaultProps = {
		location: {},
		history: {
			push: () => {},
		},
	};

	static contextType = UserContext;

	handlePasswordChangeSuccess = () => {
		const { history } = this.props;
		history.push('/login');
	};

	// handleLogoutClick = () => {
	// 	this.context.processLogout();
	// };

	renderLogoutLink() {
		const { user } = this.context;
		return (
			<div className="logout-button">
				<p>Logged in as {user.name}</p>
				<nav>
					<Link onClick={this.context.handleLogoutClick} to="/login">
						Log out
					</Link>
				</nav>
			</div>
		);
	}

	render() {
		return (
			<section className="logout-button">
				<p>Change your password here</p>
				{this.renderLogoutLink()}
				<h2>Change Password</h2>
				<ChangePasswordForm
					onPasswordChangeSuccess={this.handlePasswordChangeSuccess}
				/>
			</section>
		);
	}
}

export default ChangePasswordRoute;
