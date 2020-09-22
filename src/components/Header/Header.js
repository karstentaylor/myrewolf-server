import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
// import '../App/App.css';
import './Header.css';

class Header extends Component {
	static contextType = UserContext;

	static defaultProps = {
		loggedIn: false,
		error: null,
		registered: false,
		handleLoginState: () => {},
	};

	handleLogoutClick = (ev) => {
		TokenService.clearAuthToken();
		this.context.handleLoginState(false);
	};

	renderLogoutLink = () => {
		return (
			<div className="Header_logged-in">
				<Link onClick={this.handleLogoutClick} to="/login">
					Log out
				</Link>
			</div>
		);
	};

	renderLoginLink = () => {
		return (
			<div className="Header_not-logged-in">
				<Link to="/login">Log in</Link>
				<Link to="/register">Register</Link>
			</div>
		);
	};

	render() {
		return (
			<>
				<nav className="Nav">
					<div className="Header">
						<h1>
							<Link to="/home">My Rewolf</Link>
						</h1>
						{/* <span className="Header_tagline-wide">
							Actualize your potential
						</span> */}
						{TokenService.hasAuthToken()
							? this.renderLogoutLink()
							: this.renderLoginLink()}
					</div>
				</nav>
			</>
		);
	}
}

export default Header;
