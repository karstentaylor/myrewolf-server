import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
//import Admin from '../Admin/Admin';
import DiscoveryRoute from '../../routes/DiscoveryRoute/DiscoveryRoute';
import HomePageRoute from '../../routes/HomePageRoute/HomePageRoute';
import ChangePasswordRoute from '../../routes/ChangePasswordRoute/ChangePasswordRoute';
// import ReviewRoute from '../../routes/ReviewRoute/ReviewRoute';
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
						<Route path={'/register'} component={RegistrationRoute} />
						<Route path={'/login'} component={LoginRoute} />
						<Route
							exact
							path="/home"
							component={
								TokenService.hasAuthToken() && this.context.user.admin === true
									? AdminRoute
									: HomePageRoute
							}
						/>
						<Route path={'/admin'} component={AdminRoute} />
						{/* <Route path={'/reviews'} component={ReviewRoute} /> */}
						<Route path={'/discovery'} component={DiscoveryRoute} />
						<Route path={'/change'} component={ChangePasswordRoute} />
						<Route component={NotFoundRoute} />
					</Switch>
				</main>
				<Footer />
			</div>
		);
	}
}
