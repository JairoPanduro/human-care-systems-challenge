import React, { Component } from 'react';
import './components/login/Auth';
import axios from 'axios';
import config from './config/default'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
		  user: {
		    isAuthenticated: false
      }
    }


	}

  onSubmitForm = () => {
		this.axios.get('/login')
  };

  render() {
    return (
      <div className="App">
        {!this.state.user.isAuthenticated &&
          <Auth
	          user={this.state.user}
	          onSubmit={this.onSubmitForm}
          />
        }
        {this.state.user.isAuthenticated && <Auth onSubmit={this.onSubmitForm}></Auth>}
      </div>
    );
  }
}

export default App;
