import React, { Component } from 'react';
import {Table, Button, Glyphicon} from 'react-bootstrap';

export default class Tasks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAddOperation: false,
			newTask: {},
			onUpdate: {},
		};
	}

	onUpdate = (id) => {
		const updateIds = {...this.state.onUpdate};
		updateIds[id] = {
			name: '',
			description: '',
			dueDate: ''
		};
		this.setState({onUpdate: updateIds})
	};

	onCancelUpdate = (id) => {
		const updateIds = {...this.state.onUpdate};
		delete updateIds[id];
		this.setState({onUpdate: updateIds});
	};

	onAddClick = () => {
		this.setState({isAddOperation: true});
	};

	onHideAdd = () => {
		this.setState({isAddOperation: false});
	};

	handleNewTaskChange = (e, type) => {
		const task = {...this.state.newTask};
		task[type] = e.target.value;
		this.setState({newTask : task});
	};

	createNewTask = () => {
		this.props.onTaskCreate(this.state.newTask);
		this.setState({newTask: {}})
	};

	updateTask = (id) => {
		this.props.onTaskUpdate(id, this.state.onUpdate[id])
	};

	render() {
		return (
			<div>
				<div>
					<Button onClick={this.onAddClick} bsStyle="success">
						<Glyphicon glyph="plus"/> Add Task
					</Button>
				</div>
				<Table>
					<thead>
						<th>
							#
						</th>
						<th>
							Task Name
						</th>
						<th>
							Description
						</th>
						<th>
							Due Date
						</th>
						<th></th>
						<th></th>
					</thead>
					<tbody>
						{this.props.tasks.map(task => (
							<tr key={task.id}>
								<td>{task.id}</td>
								<td>
									{this.state.onUpdate[task.id] &&
										<FormControl
											type="text"
											value={this.state.onUpdate[task.id].name}
											placeholder="Enter name"
											onChange={(e) => this.handleNewTaskChange(e, 'name')}
										/>
									}
									{!this.state.onUpdate[task.id] && <span>{task.name}</span>}
								</td>
								<td>
									{this.state.onUpdate[task.id] &&
									<FormControl
										type="text"
										value={this.state.onUpdate[task.id].description}
										placeholder="Enter name"
										onChange={(e) => this.handleNewTaskChange(e, 'description')}
									/>
									}
									{!this.state.onUpdate[task.id] && <span>{task.description}</span>}
								</td>
								<td>
									{this.state.onUpdate[task.id] &&
									<FormControl
										type="text"
										value={this.state.onUpdate[task.id].dueDate}
										placeholder="Enter name"
										onChange={(e) => this.handleNewTaskChange(e, 'dueDate')}
									/>
									}
									{!this.state.onUpdate[task.id] && <span>{task.dueDate}</span>}
								</td>
								<td>
									<Button
										bsStyle="link"
										onClick={() => this.state.onUpdate[task.id] ? this.updateTask(task.id) : this.onUpdate(task.id)}
									>
										Update
									</Button>
									{this.state.onUpdate[task.id] &&
										<Button bsStyle="link" onClick={() => this.onCancelUpdate(task.id)}>
											Cancel
										</Button>
									}
								</td>
								<td>
									<Glyphicon onClick={() => this.props.onDelete(task.id)} glyph="remove"/>
								</td>
							</tr>
						))}
						{this.state.isAddOperation &&
							<tr>
								<td></td>
								<td>
									<FormControl
										type="text"
										value={this.state.newTask.name}
										placeholder="Enter name"
										onChange={(e) => this.handleNewTaskChange(e, 'name')}
									/>
								</td>
								<td>
									<FormControl
										type="text"
										value={this.state.newTask.description}
										placeholder="Enter description"
										onChange={(e) => this.handleNewTaskChange(e, 'description')}
									/>
								</td>
								<td>
									<FormControl
										type="text"
										value={this.state.newTask.dueDate}
										placeholder="Enter Due Date"
										onChange={(e) => this.handleNewTaskChange(e, 'dueDate')}
									/>
								</td>
								<td>
									<Button bsStyle="link" onClick={this.createNewTask}>Save</Button>
									<Button bsStyle="link" onClick={this.onHideAdd}>Cancel</Button>
								</td>
							</tr>
						}
					</tbody>
				</Table>
			</div>
		)
	}
}