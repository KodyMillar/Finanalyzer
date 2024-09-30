const connectDB = require('../config/db');

module.exports = {
    storeUserData: async (req, res) => {
        const { body } = req;
        
        const connection = await connectDB();

        try {

            connection.beginTransaction();

            const query = `INSERT INTO investments VALUES ()`;

            connection.query(query, []);

            res.status(201).send({ message: "successfully added data to be analyzed"})

        } catch ({err, name, message}) {
            connection.rollback();
            console.error(err);
            console.error(name);
            console.error(message);
            res.status(500).send({ err: "could not update database"})
        }
    }
}