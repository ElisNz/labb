const pgp = require('pg-promise')(/* options */);
const db = pgp(`postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.DBPORT || '5432'}/${process.env.DATABASE}`);


async function hello(keyword = 'elis') {

    let data = await db.many(`SELECT * FROM customer`);
    return data;
  }
  
module.exports = {
    hello
};