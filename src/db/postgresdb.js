// This "pg" package enables Node.js applications to connect to and interact with PostgreSQL databases. 

const {Pool} =  require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hunchhadigital',
    password: '',
    port: 5432,
    autoCommit: true,
    
})

module.exports = pool;
