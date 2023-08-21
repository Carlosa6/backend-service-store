const express = require('express')

const ProductService = require('../services/product.service')
const validatorHandler = require('../middlewares/validator.handler')
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/product.schema')

const service = new ProductService()
const router = express.Router()

router.get("/", async (req, res) => {
  const products = await service.findProducts()
  return res.json(products)
})

router.post("/",
  validatorHandler(createProductSchema, 'body')
  , async (req, res) => {
    const newProduct = await service.createProduct(req.body)
    return res.status(201).json(newProduct)
  })

router.patch("/:id",
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body')
  , async (req, res, next) => {
    try {
      const product = await service.updateProduct(req.params.id, req.body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  })

router.get("/:id",
  validatorHandler(getProductSchema, 'params')
  , async (req, res, next) => {

    try {
      const product = await service.findOneProduct(req.params.id)
      res.json({ product })
    } catch (error) {
      next(error)
    }

  })

router.delete("/:id", async (req, res) => {
  const deletePrd = await service.deleteOneProduct(req.params.id);
  return res.json(deletePrd)
})

module.exports = router
