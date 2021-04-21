require('dotenv').config()

module.exports = {
    'url' : process.env.DB_STRING,
    'dbName': 'MortgageCalculator'
};
