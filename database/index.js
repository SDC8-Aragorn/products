var pg = require('pg');
var connectionString = "postgresql://localhost/products";
var pgClient = new pg.Client(connectionString);
pgClient.connect();

const getProducts = async () => {
  return pgClient
    .query("SELECT * from product LIMIT 10")
    .then(res => res.rows)
    .catch(e => console.error(e.stack))
}

const getProduct = async (id) => {

  let queryOne = await pgClient.query(`SELECT * from product WHERE id = ${id}`)
  let queryTwo = await pgClient.query(`SELECT feature, value FROM features WHERE product_id = ${id}`)

  let resultOne = await queryOne.rows
  let resultTwo = await queryTwo.rows

  return [resultOne, resultTwo]
}


// const getProduct = async (id) => {

//   return pgClient
//     .query(`SELECT * from product WHERE id = ${id}`)
//     .then(res => res.rows)
//     .catch(e => console.error(e.stack))
// }


const getStyles = async (id) => {
  return pgClient
  .query(`SELECT * from product WHERE id = ${id}`)
  .then(res => res.rows)
  .catch(e => console.error(e.stack))
}

module.exports = {
  getProducts,
  getProduct
}