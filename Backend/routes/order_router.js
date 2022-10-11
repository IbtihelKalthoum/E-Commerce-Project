const express = require('express')

const orderController = require('../controllers/order_controller')

const verfiyToken = require('../middlewares/verifiyToken')

const route = express.Router()

route.post('/', verfiyToken, orderController.create)
route.put('/:token' , verfiyToken , orderController.update)
route.get('/' , verfiyToken , orderController.getOrders)
module.exports = route