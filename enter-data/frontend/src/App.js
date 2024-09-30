import React, { Component } from 'react';
import { addUserData } from './api/index';
import './App.css';

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
          <div>
            <h3>{this.state.apiResponse}</h3>
            <form action="#" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="please enter" name="investment"/>
                <input type="submit" value="submit" />
            </form>
          </div>
      );
  }

}

export default App;