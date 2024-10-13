import React, { Component } from 'react';
import { addUserData } from './api/index';
import './App.css';
import InputForm from './components/InputForm';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

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

  handleSubmit(e) {
    const { target } = e;
    e.preventDefault();
    addUserData(target.querySelector('input[name = "investment"]').value);
  }

  render() {
      return (
          <div className="App">
            <h3>{this.state.apiResponse}</h3>
            <InputForm onSubmit={this.handleSubmit} />
          </div>
      );
  }

}

export default App;