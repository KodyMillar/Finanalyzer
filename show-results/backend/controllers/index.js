const User = require('../models/user');
const Investment = require('../models/finance');

module.exports = {
    displayAnalytics: async (req, res) => {
        try {
            const user = await User.findOne({
                userId: "Kody"
            });
    
            const userInvestments = await Investment.find({
                userId: "Kody"
            });
            
            res.status(200).json({
                user: user,
                investments: userInvestments
            });

        } catch (err) {
            res.status(500).send(`Could not get investments for user Kody`);
        }
    }
}