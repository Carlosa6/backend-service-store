//CAPTURA CULQUIER ERROR
function logErrors(err, req, res, next) {
  console.log("Ejecucion logErrors")
  console.error(err)
  next(err)
}

//DETECTAR ERROR Y FORMATEAR MENSAJE
function errorHandler(err, req, res, next) {
  console.log("Ejecucion errorHandler")
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandler(err, req, res, next) {
  console.log("Ejecucion boomErrorHandler")

  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }

}

module.exports = {
  logErrors, errorHandler, boomErrorHandler
}
