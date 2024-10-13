import React, { useState } from 'react';
import styles from '../styles/InputForm.module.css'


function InputForm(props) {
    const [amount, setAmount] = useState("0.00");
    const [annualContribution, setAnnualContribution] = useState("0.00");
    const [duration, setDuration] = useState(0);

    return (
        <form className={styles.inputForm} action="#" onSubmit={props.onSubmit} >
            <h3>Investment Interest</h3>
            <div className={styles.fieldDiv}>
                <label htmlFor="amount">Investment Amount: </label>
                <input type="number" min="0" step="10" id="amount" name="investment" value={amount} className={styles.field} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className={styles.fieldDiv}>
                <label htmlFor="annual">Annual Contribution: </label>
                <input type="number" min="0" step="10" id="annual" name="annual-contribution" value={annualContribution} className={styles.field} onChange={(e) => setAnnualContribution(e.target.value)}/>
            </div>
            <div className={styles.fieldDiv}>
                <label htmlFor="duration">Duration: </label>
                <div>
                    <input type="text" id="duration" name="duration" value={duration} className={styles.durationField} onChange={(e) => setDuration(e.target.value)}/>
                    <label htmlFor="duration"> years</label>
                </div>
            </div>
            <div className={styles.fieldDiv}>
                <label>Risk </label>
                <select className={styles.dropDown} >
                    <option>Low Risk</option>
                    <option>Conservative</option>
                    <option>Balanced</option>
                    <option>Intermediate Risk</option>
                    <option>High Risk</option>
                </select>
            </div>
            <input type="submit" value="submit" />
        </form>
    )
}

export default InputForm;