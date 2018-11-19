import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

export default class UserInfo extends Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<Button onClick={this.props.onLogout}>
						Logout
					</Button>
				</div>
				<div>
					<Label bsStyle="info">User Info</Label>{' '}
					Name: {this.props.user.name}, Email: {this.props.user.email}, Birthday: {this.props.user.birthday}
				</div>
			</React.Fragment>
		)
	}
}