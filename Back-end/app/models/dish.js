var mongooose = require('mongoose');
var DishSchema = require('../schemas/dish.js');
var Dish = mongooose.model('Dish', DishSchema);

module.exports = Dish;