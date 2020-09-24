import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import DiscoveryRoute from '../../routes/DiscoveryRoute/DiscoveryRoute';
import HomePageRoute from '../../routes/HomePageRoute/HomePageRoute';
import ChangePasswordRoute from '../../routes/ChangePasswordRoute/ChangePasswordRoute';
import WelcomeRoute from '../../routes/WelcomeRoute/WelcomeRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import AdminRoute from '../../routes/AdminRoute/AdminRoute';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import Header from '../Header/Header.js';
import './App.css';
import Footer from '../../components/Footer/Footer';

export default class App extends Component {
	state = {
		hasError: false,
	};

	static contextType = UserContext;

	static getDerivedStateFromError(error) {
		console.error(error);
		return { hasError: true };
	}

	render() {
		const { hasError } = this.state;
		return (
			<div className="App">
				<header className="App_header">
					<Header />
				</header>
				<main>
					{hasError && <p>There was an error! Oh no!</p>}
					<Switch>
						<Route exact path={'/'} component={WelcomeRoute} />
						<PublicOnlyRoute path={'/register'} component={RegistrationRoute} />
						<PublicOnlyRoute path={'/login'} component={LoginRoute} />
						<PrivateRoute
							exact
							path="/home"
							component={
								TokenService.hasAuthToken() && this.context.user.admin === true
									? AdminRoute
									: HomePageRoute
							}
						/>
						<PrivateRoute path={'/home'} component={HomePageRoute} />
						<PrivateRoute path={'/admin'} component={AdminRoute} />
						<PrivateRoute path={'/discovery'} component={DiscoveryRoute} />
						<PrivateRoute path={'/change'} component={ChangePasswordRoute} />
						<Route component={NotFoundRoute} />
					</Switch>
				</main>
				<Footer />
			</div>
		);
	}
}
