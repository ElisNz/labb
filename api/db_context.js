const pgp = require('pg-promise')(/* options */);
const db = pgp(`postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.dbport || '5432'}/${process.env.DATABASE}`);


async function hello(keyword = 'elis') {

    let data = await db.any(`SELECT * FROM customer WHERE first_name LIKE '${keyword}%'`);
  
    return data;
  }
  
module.exports = {
    hello
};