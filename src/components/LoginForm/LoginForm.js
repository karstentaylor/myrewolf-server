import React, { Component } from 'react';
import { Input, Required } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import '../App/App.css';
//import '../../routes/LoginRoute/LoginRoute.css';

class LoginForm extends Component {
	static defaultProps = {
		onLoginSuccess: () => {},
	};

	static contextType = UserContext;

	state = { error: null };

	firstInput = React.createRef();

	handleSubmit = (ev) => {
		ev.preventDefault();
		const { email, password } = ev.target;
		console.log(email, password);

		this.setState({ error: null });

		AuthApiService.postLogin({
			email: email.value,
			password: password.value,
		})
			.then((res) => {
				email.value = '';
				password.value = '';
				this.context.processLogin(res.authToken);
				this.props.onLoginSuccess();
			})
			.catch((res) => {
				this.setState({ error: res.error });
			});
	};

	componentDidMount() {
		this.firstInput.current.focus();
	}

	render() {
		const { error } = this.state;
		return (
			<form className="LoginForm" onSubmit={this.handleSubmit}>
				<div className="alert" role="alert">
					{error && <p>{error}</p>}
				</div>
				<div className="email">
					<label htmlFor="login-email-input" hidden>
						E-mail <Required />
					</label>
					<Input
						ref={this.firstInput}
						id="login-email-input"
						name="email"
						required
						placeholder="E-mail"
					/>
				</div>
				<div className="password">
					<label htmlFor="login-password-input" hidden>
						Password <Required />
					</label>
					<Input
						id="login-password-input"
						name="password"
						type="password"
						required
						placeholder="Password"
					/>
				</div>
				<div className="button-container">
					<Button type="submit">Log In</Button>
				</div>
			</form>
		);
	}
}

export default LoginForm;
