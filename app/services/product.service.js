const faker = require('faker')
const boom = require("@hapi/boom")

class ProductsService {

  constructor() {
    this.products = []
    this.generateProducts()
  }

  generateProducts() {
    const limit = 120;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async createProduct(product) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product
    }
    this.products.push(newProduct)
    return newProduct
  }

  async findProducts() {
    return this.products
  }

  async findOneProduct(id) {
    const product = this.products.find(prd => prd.id === id);

    if (!product) {
      throw boom.notFound("Producto no encontrado")
    }

    if (product.isBlock) {
      throw boom.conflict("El producto está bloqueado")
    }

    return product

  }

  async updateProduct(id, changes) {
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      throw boom.notFound("Producto no encontrado")
    }

    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }

    return this.products[index]

  }

  async deleteOneProduct(id) {
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      throw boom.notFound("Producto no encontrado")
    }

    this.products.splice(index, 1)
    return { id }
  }

}

module.exports = ProductsService
