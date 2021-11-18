var pg = require('pg');
var connectionString = "postgresql://localhost/products";
var pgClient = new pg.Client(connectionString);
pgClient.connect();

// var query = pgClient.query("SELECT id from products where id = '1'");

pgClient
  .query("SELECT * from product where id = '1'")
  .then(res => console.log(res.rows))
  .catch(e => console.error(e.stack))