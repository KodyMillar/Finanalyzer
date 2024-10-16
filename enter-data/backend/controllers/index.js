const connectDB = require('../config/db');

module.exports = {
    storeUserData: async (req, res) => {
        const { body } = req;
        
        const connection = await connectDB();

        try {

            const userId = req.session.userId;
            const investmentAmount = body.investment;
            const annualContribution = body.annualContribution;
            const duration = body.duration;
            const risk = body.risk;
            const years = body.years;

            connection.beginTransaction();

            const query = `INSERT INTO investments (userid, investment_amount, annual_contribution, duration, risk, years) VALUES 
            (?, ?, ?, ?, ?, ?)`;

            connection.query(query, [userId, investmentAmount, annualContribution, duration, risk, years]);

            connection.commit();

            res.status(201).send(`successfully added data to be analyzed`)

        } catch ({err, name, message}) {
            connection.rollback();
            console.error(err);
            console.error(name);
            console.error(message);
            res.status(500).send("could not update database")
        }
    }
}