import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import '../App/App.css';
import './Welcome.css';

class Welcome extends Component {
	render() {
		return (
			<section className="button-container">
				<div className="Space"></div>
				<Link to="/register">
					<Button type="button">Sign Up</Button>
				</Link>
				<Link to="/login">
					<Button type="button">Log In</Button>
				</Link>
			</section>
		);
	}
}

export default Welcome;
