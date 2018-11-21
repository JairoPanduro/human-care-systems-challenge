import React, { Component } from 'react';
import {
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
	Button
} from 'react-bootstrap';

export default class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: '',
			loginErrMsg: '',
			passErrMsg: ''
		}
	}

	login = (e) => {
		e.preventDefault();

		if (this.validate()) {
			this.props.onSubmit({
				login: this.state.login,
				password: this.state.password,
			});
		}
	};

	validate = () => {
		return this.state.loginErrMsg.length === 0 && this.state.passErrMsg.length === 0;
	};

	getLoginValidation(login) {
		if (login.length === 0) {
			return 'Login is empty'
		}

		return '';
	}

	getPasswordValidation(password) {
		if (password.length === 0) {
			return 'Password is required';
		}

		return '';
	}

	handleLoginChange = (e) => {
		this.setState({
			login: e.target.value,
			loginErrMsg: this.getLoginValidation(e.target.value)
		});
	}

	handlePasswordChange = (e) => {
		this.setState({
			password: e.target.value,
			passErrMsg: this.getPasswordValidation(e.target.value)
		});
	}

	render() {
		return (
			<form className="form">
				{this.props.user.error &&
					<FormGroup
						controlId="formMessage"
						validationState={'error'}
					>
						<HelpBlock>
							{this.props.user.error}
						</HelpBlock>
					</FormGroup>
				}
				<FormGroup
					controlId="formLogin"
					validationState={this.state.loginErrMsg.length > 0 ? 'error' : null}
				>
					<ControlLabel>
						Login
					</ControlLabel>
					<FormControl
						type="text"
						value={this.state.login}
						placeholder="Enter login"
						onChange={this.handleLoginChange}
					/>
					{this.state.loginErrMsg.length > 0 &&
						<HelpBlock>
							{this.state.loginErrMsg}
						</HelpBlock>
					}
				</FormGroup>
				<FormGroup
					controlId="formPassword"
					validationState={this.state.passErrMsg.length > 0 ? 'error' : null}
				>
					<ControlLabel>
						Password
					</ControlLabel>
					<FormControl
						type="password"
						value={this.state.password}
						onChange={this.handlePasswordChange}
					/>
					{this.state.passErrMsg.length > 0 &&
						<HelpBlock>
							{this.state.passErrMsg}
						</HelpBlock>
					}
				</FormGroup>
				<FormGroup>
					<Button onClick={this.login} type="submit">Sign in</Button>
				</FormGroup>
			</form>
		)
	}
}