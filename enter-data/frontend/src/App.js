import React, { Component } from 'react';
import { addUserData } from './api/index';
import './App.css';
import InputForm from './components/InputForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch(`http://localhost:8080/`)
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.callAPI();
  }

  handleLogin = () => {
    window.location.href = 'http://localhost:9088/auth/google';
  };

  handleSubmit = (e) => {
    const { target } = e;
    e.preventDefault();
    addUserData(target.querySelector('input[name="investment"]').value);
  };

  render() {
    return (
      <div className="App">
        <h3>{this.state.apiResponse}</h3>
        <button onClick={this.handleLogin}>Login with Google</button>
        <InputForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;