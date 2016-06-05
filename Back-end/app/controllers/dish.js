var Dish = require("../models/dish.js");

//addDish
exports.addDish = function(req, res) {
	var dish = req.body.dish;
	var _name = dish.name;
	var _price = dish.price;
	var _count = dish.count;
	Dish.create({"name":_name, "price":_price, "count":_count}, 
		function(err, result) {
			if (err) {
				console.log(err);
                res.json({success:0});
			} else {
				res.json({success:1});
			}
		}
	);
};

//deleteDish
exports.deleteDish = function(req, res) {
	var _dish = req.body.dish;
	var _name = _dish.name;
	if (_name) {
		Dish.remove({"name":_name}, function(err, dish) {
			if (err) {
                console.log(err);
                res.json({success:0});
            } else {
                res.json({success:1});
            }
		});
	}
};

//changeDishCount
exports.changeDishCount = function(req, res) {
	var _dish = req.body.dish;
	var _name = dish.name;
	var _count = dish.count;
	if (_count >= 0) {
		Dish.updata({"name":_name}, {"dish":_dish}, function(err, result) {
			if (err) {
				console.log(err);
				res.json({success:0});
			} else {
				res.json({success:1});
			}
		});
	}
};

//showAllDish
exports.showAllDish = function(req, res) {
	Dish.fetch(function(err, result) {
		if (err) {
			console.log(err);
		}
		console.log(result);
		var DishName = [];
		for (var index = 0; index < result.length; index++) {
			var _dish = result[index];
			var _name = _dish.getName();
			DishName.push(_name);
		}
        res.json({"dish":DishName});
	});
};

//showAllDishAndCount
exports.showAllDishAndCount = function(req, res) {
	Dish.fetch(function(err, result) {
		if (err) {
			console.log(err);
		}
		console.log(result);
        var DishNameAndCount = [];
		for (var index = 0; index < result.length; index++) {
			var _dish = result[index];
			var _name = _dish.getName();
			var _count = _dish.getCount();
			var str = "{" + '"name":' + '"' + _name + '"' + ", " + '"count":' + '"' + _count + '"' + "}";
			var obj = JSON.parse(str);
			DishNameAndCount.push(obj);
		}
        res.json({"dish":DishNameAndCount});
	});
};