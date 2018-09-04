import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    isLoading: true
	}
	handleChange = event => {
    this.setState({ users: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
;
    //fetch ile servise erişim yapabiliriz
    //bir promise dönüyor
    //json verilerinin otomatik dönüşümlerini gerçekleştiriyoruz
  componentDidMount() {
    setTimeout(()=>{
      axios.get('http://jsonplaceholder.typicode.com/users')
      .then(users => users.data)
      .then(users => {
        this.setState({
          users,
          isLoading: false
        });
        })
      },1000);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="App">
        <h1>Users</h1>
        { isLoading ? 'Loading...' : '' }
        {
          !isLoading ? this.state.users.map(user =>
            <div key={ user.id } className={"userList"}>
              { user.name } { user.username } {user.address.city}
              <h4> | {user.address.city} | </h4>
            </div>
          ) : null
				}
				<form onSubmit={this.handleSubmit}>
          <label>
            User Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Search</button>
        </form>
			
      </div>
    );
  }
}

export default App;


