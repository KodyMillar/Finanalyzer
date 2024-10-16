import React, { Component } from 'react';
import styles from './styles/App.module.css';
import UserFinance from './components/UserFinance';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    // Fetch user data if needed
    fetch('/api/user')
      .then(res => res.json())
      .then(user => {
        console.log(user); // Add this line to log the user data
        this.setState({ user });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className={styles.app}>
        <h1 className={styles.appHeader}>Investment Analytics</h1>
        {this.state.user ? (
          <div>
            <h2>Welcome, {this.state.user.name}</h2>
            {/* Display more user info or results */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <UserFinance />
      </div>
    );
  }
}

export default App;