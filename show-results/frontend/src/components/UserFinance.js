import React, { useState, useEffect } from 'react';
import UserInvestments from './UserInvestments';
import { getUserFinanceData } from '../api/userFinanceData';
import styles from '../styles/UserFinance.module.css'

function UserFinance() {

    const [userFinanceData, setUserFinanceData] = useState({ investments: [] });
    const [currentInvestments, setCurrentInvestments] = useState([]);
  
    useEffect(() => {
      const checkForUpdates = () => {
        getUserFinanceData()
          .then((response) => {  
            if (response.status === 200) {
              response.data.sort((a, b) => a._id.localeCompare(b._id));
              currentInvestments.sort((a, b) => a._id.localeCompare(b._id));
      
              const new_investments = []
              for (let i=0; i < response.data.length; i++) {
                if (currentInvestments.length === 0 || !(response.data[i]._id === currentInvestments[i]?._id)) {      
                  new_investments.push(response.data[i]);
                }
              }
    
              if (new_investments.length > 0) {
                setCurrentInvestments((prev) => {
                  return [...new_investments, ...prev];
                });
              }
    
            }
          })
          .catch((err) => console.error(err));
      } 
  
      checkForUpdates()
      const intervalId = setInterval(checkForUpdates, 30000);
  
      return () => clearInterval(intervalId);
    }, [currentInvestments])
    
    useEffect(() => {
      setUserFinanceData(() => ({
        investments: [
          ...currentInvestments
        ]
      }));
  
    }, [currentInvestments])
  
    
    return (
      <>
        <UserInvestments className={styles.investmentComponent} userInvestments={userFinanceData.investments} />
      </>
    );
  }
  
  export default UserFinance;
  