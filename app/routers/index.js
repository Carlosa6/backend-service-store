const express = require('express');

const productRoutes = require('./product.route')

function routesApi(app) {
  const router = express.Router()
  app.use("/api/v1", router)
  router.use("/products", productRoutes)
}

module.exports = routesApi
