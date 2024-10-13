import React, { useState, useEffect } from 'react';
import './App.css';
import UserInvestments from './components/UserInvestments';
import { getUserFinanceData } from './api/userFinanceData';

function App() {

  const [userFinanceData, setUserFinanceData] = useState({
    investments: [
      {
        interest: 0,
        interestPercentage: 0
      }
    ]
  });
  
  useEffect(() => {
    getUserFinanceData()
      .then((response) => {
        if (response.status == 200) {
          setUserFinanceData(() => {
            return {
              investments: response.data
            }
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);
  
  return (
    <>
      <h1>Investment Analytics</h1>
      <UserInvestments userInvestments={userFinanceData.investments} />
    </>

  );
}

export default App;
