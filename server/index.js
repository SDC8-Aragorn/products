const express = require('express')
const app = express()
const db = require('../database/index.js')

const PORT = 3000

app.get('/', function (req, res) {
  res.send('Please specify an endpoint!')
})

app.get('/products', function (req, res) {
  db.getProducts()
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    res.send('Error retrieving products!')
  })
})

app.get('/products/:product_id', function (req, res) {
  db.getProduct(req.params.product_id)
  .then (result => {
    let product = result[0][0]
    product.features = result[1]
    res.json(product)
  })
})

//STYLES
// app.get('/products/:product_id/styles', function (req, res) {
//   db.getStyles(req.params.product_id)
//   .then (result => {
//     res.json(result)
//   })
// })


app.listen(PORT, ()=> {
  console.log(`Server listening on port: ${PORT}`)
})