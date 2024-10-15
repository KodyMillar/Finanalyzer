CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};
USE ${MYSQL_DATABASE};

CREATE TABLE IF NOT EXISTS investment (
    userid varchar(255) primary key NOT NULL,
    investment_amount decimal(20,2) NOT NULL,
    annual_contribution decimal(20,2) NOT NULL,
    duration integer NOT NULL,
    risk enum('Low Risk', 'Conservative', 'Balanced', 'High Risk', 'Aggressive') NOT NULL,
    years integer NOT NULL
);