const {Sequelize} = require('sequelize');
var pg = require('pg');
pg.defaults.ssl = {
    rejectUnauthorized: false
};

const db = new Sequelize('postgres://qakqezvczuxuhd:89850a80219e07bc6506b70bd8c5550463529a55de76c4074b61c8402571647a@ec2-54-211-238-131.compute-1.amazonaws.com:5432/d7fddmptilrpg7', {
    ssl: {
        rejectUnauthorized: false
    }
});
db.sync({
    force: false
})

async function init() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

init();

module.exports = {
    db
}
