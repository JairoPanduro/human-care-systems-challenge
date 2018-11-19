import React, { Component } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import config from './config/default'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
		  user: {
		    isAuthenticated: false,
			  token: false,
      },
	    tasks: []
    };

	}

	getAxios = () => {
  	if (!this.axios) {
		  this.axios = axios.create({
			  baseURL: config.apiUrl,
			  header: {
				  Authorization: `Token ${this.state.user.token}`
			  }
		  });
	  }

	  return this.axios;
	};

  onLoginSubmit = data => {
		axios.post('/login', data).then(resp => {
			this.setState({user: resp.data})
		});
  };

  onLogout = () => {
  	this.setState({user: {isAuthenticated: false, token: false}, tasks: []});
  };


	onTaskDelete = id => {
		this
			.getAxios()
			.delete(`/tasks/${id}`)
			.then(() => {
				const tasks = this.state.tasks.filter(task => task.id !== id);
				this.setState({tasks});
			})
	};

	onTaskUpdate = (id, data) => {
		this
			.getAxios()
			.put(`/tasks/${id}`, data)
			.then(() => {
				const tasks = this.state.tasks;
				tasks.forEach((task, taskId) => {
					if (task.id === id) {
						tasks[taskId] = data;
					}
				});

				this.setState({tasks});
			});
	};

	onTaskCreate = data => {
		this
			.getAxios()
			.post(`/tasks`, data)
			.then((resp) => {
				const tasks = this.state.tasks;
				tasks.push(resp.data);
				this.setState({tasks});
			});
	};

  render() {
    return (
      <div className="App">
        {!this.state.user.isAuthenticated &&
          <Auth
	          user={this.state.user}
	          onSubmit={this.onLoginSubmit}
          />
        }
        {this.state.user.isAuthenticated &&
          <Dashboard
	          user={this.state.user}
	          tasks={this.state.tasks}
	          onLogout={this.onLogout}
	          onTaskCreate={this.onTaskCreate}
	          onTaskUpdate={this.onTaskUpdate}
	          onTaskDelete={this.onTaskDelete}
          />
        }
      </div>
    );
  }
}

export default App;
