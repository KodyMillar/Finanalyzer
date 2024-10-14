import React from 'react';
import styles from './styles/App.module.css';
import UserFinance from './components/UserFinance';

function App() {
  
  return (
    <div className={styles.app}>
      <h1 className={styles.appHeader}>Investment Analytics</h1>
      <UserFinance />
    </div>
  );
}

export default App;
