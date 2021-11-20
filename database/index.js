var pg = require('pg');
var connectionString = "postgresql://localhost/products";
var pgClient = new pg.Client(connectionString);
pgClient.connect();

const getProducts = async () => {
  return pgClient
    .query("SELECT * from product LIMIT 5")
    .then(result => result.rows)
    .catch(e => console.error(e.stack))
}

const getProduct = async (id) => {

  let queryOne = await pgClient.query(`SELECT * FROM product WHERE id = ${id}`)
  let queryTwo = await pgClient.query(`SELECT feature, value FROM features WHERE product_id = ${id}`)

  let resultOne = await queryOne.rows
  let resultTwo = await queryTwo.rows

  return [resultOne, resultTwo]
}



const getStyles = async (id) => {

  let stylesQuery = await pgClient.query(`SELECT id AS style_id, name, original_price, sale_price, default_style AS "default?" FROM styles WHERE productId IN ('${id}')`)
  let styles = await stylesQuery.rows

  let photosQuery = styles.map(async style => {
    return pgClient.query(`SELECT url, thumbnail_url FROM photos WHERE styleid IN ('${style.style_id}')`)
  })

  let skusQuery = styles.map(async style => {
    return pgClient.query(`SELECT id AS sku, size, quantity FROM skus WHERE styleId IN ('${style.style_id}')`)
  })

  let photos = await Promise.all(photosQuery)
  let skus = await Promise.all(skusQuery)

  styles.forEach((style, i) => {
    if (style.sale_price === null) {
      style.sale_price = '0'
    }
    if(style['default?'] === 1) {
      style['default?'] = true
    } else style['default?'] = false

    style.original_price = style.original_price.toString()
    style.photos = photos[i].rows

    let skuObj = {}
    skus[i].rows.forEach(row => {
      let skuNumber = row.sku
      skuObj[skuNumber] = {size: row.size, quantity: row.quantity}
    })
    style.skus = skuObj

  })

  return {product_id: id, results: styles}
}

const getRelated = async (id) => {
  let relatedQuery = await pgClient.query(`SELECT related_product_id FROM related WHERE current_product_id = ${id}`)
  let related = relatedQuery.rows.map(async relate => relate.related_product_id)

  let relatedProducts = await Promise.all(related)
  return relatedProducts
}

module.exports = {
  getProducts,
  getProduct,
  getStyles,
  getRelated
}