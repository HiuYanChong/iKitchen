var mongooose = require('mongoose');
var OrderSchema = require('../schemas/order.js');
var Order = mongooose.model('Order', OrderSchema);

module.exports = Order;