import React, { Component } from 'react';
import {
	Button,
	Label,
	Col
} from 'react-bootstrap';
import parseDate from '../helpers/date';

export default class UserInfo extends Component {
	render() {
		return (
			<React.Fragment>
				<Col xs={2} xsOffset={10}>
					<Button onClick={this.props.onLogout}>
						Logout
					</Button>
				</Col>
				<div className="well-lg">
					<Label bsStyle="info">User Info</Label>{' '}
					<div>
						Name: {this.props.user.name}, <br/>
						Email: {this.props.user.email}, <br/>
						Birthday: {parseDate(this.props.user.birthday)}<br/>
					</div>
				</div>
			</React.Fragment>
		)
	}
}