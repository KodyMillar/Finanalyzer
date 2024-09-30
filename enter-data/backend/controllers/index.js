const connectDB = require('../config/db');

module.exports = {
    storeUserData: async (req, res) => {
        const { body } = req;
        
        const connection = await connectDB();

        try {

            connection.beginTransaction();

            const query = `INSERT INTO investments (amount) VALUES 
            (?)`;

            connection.query(query, [body.investment]);

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