const express = require('express')
const cors = require('cors')

const routesApi = require('./app/routers')
const { errorHandler, logErrors, boomErrorHandler } = require('./app/middlewares/error.handler')

const app = express()
const port = 4100
const whiteList = ['http://localhost:8080']
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("No se puede conectar al servicio"))
    }
  }
}

app.use(express.json())
app.use(cors(options))

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

routesApi(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
