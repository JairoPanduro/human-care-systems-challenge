import React, { Component } from 'react';
import Tasks from './Tasks';
import UserInfo from './UserInfo';

export default class Dashboard extends Component {
	render() {
		return (
			<React.Fragment>
				<UserInfo user={this.props.user} onLogout={this.props.onLogout} />
				<Tasks
					tasks={this.props.user.tasks}
					onDelete={this.props.onTaskDelete}
					onCreate={this.props.onTaskCreate}
					onUpdate={this.props.onTaskUpdate}
				/>
			</React.Fragment>
		)
	}
}