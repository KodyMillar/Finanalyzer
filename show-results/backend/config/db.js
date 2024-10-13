const mongoose = require('mongoose');

const db_host = process.env.DB_HOST
const db_port = process.env.db_port

connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${db_host}:${db_port}/finance_analytics`);
        console.log(`Connected to MongoDB server at mongodb://${db_host}:${db_port}/finance_analytics`)
        
        mongoose.connection.on('error', err => {
            console.error(`Error: ${err.message}`);
        });

    } catch (err) {
        console.error(`Error: ${err.message}`);
        throw err;
    }
}

module.exports = connectDB;