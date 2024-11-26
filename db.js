const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Basketball DataBase',
    password: 'postgrespassword',
    port: 5433,
});

module.exports = pool;