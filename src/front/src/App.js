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
	      tasks: []
      }
    };

	}

	getAxios = () => {
  	if (!this.axios) {
		  this.axios = axios.create({
			  baseURL: config.apiUrl,
			  headers: {
				  Authorization: `Token ${this.state.user.token}`
			  }
		  });
	  }

	  return this.axios;
	};

  onLoginSubmit = data => {
		axios.post(config.apiUrl + '/login', data).then(resp => {
			this.setState(state => {
				const prevState = {...state};
				if (resp.data.error) {
					prevState.user.error = resp.data.error;
				} else {
					prevState.user = resp.data;
					prevState.user.isAuthenticated = true;
				}
				return {...prevState};
			});
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
				const tasks = this.state.user.tasks.filter(task => task._id !== id);
				const user = {...this.state.user, tasks};
				this.setState({user});
			})
	};

	onTaskUpdate = (id, data) => {
		return this
			.getAxios()
			.put(`/tasks/${id}`, data)
			.then((resp) => {
				const user = {...this.state.user, tasks: resp.data.tasks};
				this.setState({user});
			});
	};

	onTaskCreate = data => {
		this
			.getAxios()
			.post(`/tasks`, data)
			.then((resp) => {
				const tasks = this.state.user.tasks;
				tasks.push(resp.data);
				const user = {...this.state.user, tasks};
				this.setState({user});
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
