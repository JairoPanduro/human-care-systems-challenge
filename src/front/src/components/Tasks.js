import React, { Component } from 'react';
import {Table, Button, Glyphicon, FormControl} from 'react-bootstrap';
import parseDate from '../helpers/date';

export default class Tasks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAddOperation: false,
			newTask: {},
			onUpdate: {},
		};
	}

	onUpdate = (task) => {
		const onUpdateTasks = {...this.state.onUpdate};
		onUpdateTasks[task._id] = {...task};
		this.setState({onUpdate: onUpdateTasks})
	};

	onCancelUpdate = (id) => {
		const onUpdateTasks = {...this.state.onUpdate};
		delete onUpdateTasks[id];
		this.setState({onUpdate: onUpdateTasks});
	};

	onAddClick = () => {
		this.setState({isAddOperation: true});
	};

	onHideAdd = () => {
		this.setState({isAddOperation: false});
	};

	handleUpdateTaskChange = (e, id, type) => {
		const onUpdateTasks = {...this.state.onUpdate};
		onUpdateTasks[id][type] = e.target.value;
		this.setState({onUpdate: onUpdateTasks});
	};

	handleNewTaskChange = (e, type) => {
		const task = {...this.state.newTask};
		task[type] = e.target.value;
		this.setState({newTask : task});
	};

	createNewTask = () => {
		this.props.onCreate(this.state.newTask);
		this.setState({newTask: {}})
	};

	updateTask = (id) => {
		this.props
			.onUpdate(id, this.state.onUpdate[id])
			.then(() => this.onCancelUpdate(id))
	};

	deleteTask = id => {
		return this.props.onDelete(id);
	};

	render() {
		return (
			<div className='well-lg'>
				<div>
					<Button onClick={this.onAddClick} bsStyle="success">
						<Glyphicon glyph="plus"/> Add Task
					</Button>
				</div>
				<Table>
					<thead>
						<tr>
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
							<th>&nbsp;</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{this.props.tasks.map(task => (
							<tr key={task._id}>
								<td>{task._id}</td>
								<td>
									{this.state.onUpdate[task._id] &&
										<FormControl
											type="text"
											value={this.state.onUpdate[task._id].name}
											placeholder="Enter name"
											onChange={(e) => this.handleUpdateTaskChange(e, task._id, 'name')}
										/>
									}
									{!this.state.onUpdate[task._id] && <span>{task.name}</span>}
								</td>
								<td>
									{this.state.onUpdate[task._id] &&
									<FormControl
										type="text"
										value={this.state.onUpdate[task._id].description}
										placeholder="Enter name"
										onChange={(e) => this.handleUpdateTaskChange(e, task._id, 'description')}
									/>
									}
									{!this.state.onUpdate[task._id] && <span>{task.description}</span>}
								</td>
								<td>
									{this.state.onUpdate[task._id] &&
									<FormControl
										type="date"
										value={this.state.onUpdate[task._id].dueDate}
										placeholder="Enter name"
										onChange={(e) => this.handleUpdateTaskChange(e, task._id, 'dueDate')}
									/>
									}
									{!this.state.onUpdate[task._id] && <span>{parseDate(task.dueDate)}</span>}
								</td>
								<td>
									<Button
										bsStyle="link"
										onClick={() => this.state.onUpdate[task._id] ? this.updateTask(task._id) : this.onUpdate(task)}
									>
										Update
									</Button>
									{this.state.onUpdate[task._id] &&
										<Button bsStyle="link" onClick={() => this.onCancelUpdate(task._id)}>
											Cancel
										</Button>
									}
								</td>
								<td>
									<Glyphicon className="on-delete"
									           onClick={() => this.deleteTask(task._id)} glyph="remove"/>
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
										type="date"
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