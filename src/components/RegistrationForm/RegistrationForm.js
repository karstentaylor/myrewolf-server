import React, { Component } from 'react';
import { Input, Required, Label } from '../Form/Form';
import UserApiService from '../../services/user-api-service';
import TokenService from '../../services/token-service';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import '../App/App.css';
import './RegistrationForm.css';

class RegistrationForm extends Component {
	static contextType = UserContext;
	static defaultProps = {
		onRegistrationSuccess: () => {},
	};

	state = { error: null };

	firstInput = React.createRef();

	handleSubmit = (ev) => {
		ev.preventDefault();
		const { name, email, password } = ev.target;
		console.log(name);
		UserApiService.postUser({
			name: name.value,
			email: email.value,
			password: password.value,
		})
			.then((res) => {
				name.value = '';
				email.value = '';
				password.value = '';
				this.props.onRegistrationSuccess();
				TokenService.saveAuthToken(res.authToken);
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
			<form onSubmit={this.handleSubmit}>
				<div className="alert" role="alert">
					{error && <p>{error}</p>}
				</div>
				<div className="name">
					<Label htmlFor="Registration_name" hidden>
						Name <Required />
					</Label>
					<Input
						ref={this.firstInput}
						name="name"
						type="text"
						required
						placeholder="Name"
						id="RegistrationForm_name"
					></Input>
				</div>
				<div className="email">
					<Label htmlFor="RegistrationForm_email" hidden>
						E-mail <Required />
					</Label>
					<Input
						name="email"
						type="text"
						required
						placeholder="E-mail"
						id="RegistrationForm_email"
					></Input>
				</div>
				<div className="password">
					<Label htmlFor="RegistrationForm_password" hidden>
						Password <Required />
					</Label>
					<Input
						name="password"
						type="password"
						required
						placeholder="Password"
						id="RegistrationForm_password"
					></Input>
				</div>
				<div className="RegButton">
					<Button type="submit">Register</Button>
				</div>
			</form>
		);
	}
}

export default RegistrationForm;
