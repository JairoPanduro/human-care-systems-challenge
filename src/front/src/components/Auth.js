import React, { Component } from 'react';
import {
	Form,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock
} from 'react-bootstrap';

export default class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: null,
			password: null,
			loginErrMsg: '',
			passErrMsg: ''
		}
	}

	getLoginValidation() {
		if (this.state.login.length === 0 ) {
			this.setState({loginErrMsg: 'Login is empty'});
			return 'error';
		} else if (this.state.login.length > 3) {
			this.setState({loginErrMsg: 'Login should contain more than 3 characters'});
			return 'warning';
		} else {
			this.setState({loginErrMsg: ''});
		}

		return 'success';
	}

	getPasswordValidation() {

		if (this.state.password.length === 0) {
			this.setState({passErrMsg: 'Password is required'});
			return 'error';
		} else if (this.state.password.length > 5) {
			this.setState({passErrMsg: 'Password should be longer than 5 chars!!'});
			return 'warning';
		} else {
			this.setState({passErrMsg: ''});
		}

		return 'success';
	}

	handleLoginChange(e) {
		this.setState({login: e.target.value})
	}

	handlePasswordChange(e) {
		this.setState({password: e.target.value})
	}

	render() {
		return (
			<Form horizontal>
				<FormGroup
					controlId="formLogin"
					validationState={this.getLoginValidation()}
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
					validationState={this.getPasswordValidation()}
				>
					<ControlLabel>
						Password
					</ControlLabel>
					<FormControl
						type="text"
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
					<Button type="submit">Sign in</Button>
				</FormGroup>
			</Form>
		)
	}
}