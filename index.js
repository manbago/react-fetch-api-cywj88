import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };

  fetchUsers() {
    fetch('https://www.breakingbadapi.com/api/characters')
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const { isLoading, users, error } = this.state;
    return (
      <React.Fragment>
        <h1>Random User</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          users.map(user => {
            const { name, nickname } = user;
            return (
              <div key={name}>
                <p>Name: {name}</p>
                <p>Apodo: {nickname}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));