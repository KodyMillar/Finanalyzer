import React from 'react';

function UserInvestments ({userInvestments}) {
    return (
        <div>
            {userInvestments.map(investment => (
                <div>
                    <h4>Interest: {investment.interest}</h4>
                    <h4>Interest Percentage: {investment.interestPercentage}</h4>
                </div>
            ))}
        </div>
    );
}

export default UserInvestments;