import React from 'react';
import styles from '../styles/UserInvestment.module.css';

function UserInvestments ({userInvestments, className}) {
    return (
        <div className={className}>
            {userInvestments.map(investment => (
                <div className={styles.investmentBlock}>
                    <h3 className={styles.investmentBlockDate}>{new Date(investment.dateCreated).toLocaleDateString()}</h3>
                    <h4>Initial: {investment.initialInvestment}</h4>
                    <h4>Annual: {investment.annualContribution}</h4>
                    <h4>Duration: {investment.duration} years</h4>
                    <h4>Interest: {investment.interest}</h4>
                    <h4>Interest Percentage: {investment.interestPercentage}</h4>
                    <h4>Total Return: {investment.totalReturn}</h4>
                </div>
            ))}
        </div>
    );
}

export default UserInvestments;