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
                // res.json({success:0});
                alert("添加失败");
			} else {
				// res.json({success:1});
				res.redirect('/managerView');
			}
		}
	);
};

//deleteDish
exports.deleteDish = function(req, res) {
	var _name = req.body.name;
	if (_name) {
		Dish.remove({"name":_name}, function(err, dish) {
			if (err) {
                console.log(err);
                res.json({success:0});
            } else {
                res.json({success:1});
            }
		});
	} else {
        res.json({success:0});
    }
};

//changeDishCount
exports.changeDishCount = function(req, res) {
	var dish = req.body.dish;
    var errorMessage = '';
    var success = 1;
    function setCount(_name, _count, index, res) {
        Dish.findByName(_name, function(err, result) {
            if (err) {
                console.log(err);
                success = 0;
                errorMessage += _name +"项修改失败; ";
            } else {
                result.setCount(_count);        
            }
        });
    }
    for (var index = 0; index < dish.length; index++) {
        var _dish = dish[index];
        var _name = _dish.dishName;
        var _count = _dish.count;
        if (_count >= 0) {
            setCount(_name, _count, index, res);
        } else {
            success = 0;
            errorMessage += "Dish" + _name +"项传入数值不符规定; ";
        }
    }
    if (success == 1) {
        res.json({"success":1});
    } else {
        res.json({"success":0, "error":errorMessage});
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
exports.showAllDishForOrder = function(req, res) {
	Dish.fetch(function(err, result) {
		if (err) {
			console.log(err);
		}
		console.log(result);
  //       var DishNameAndCount = [];
		// for (var index = 0; index < result.length; index++) {
		// 	var _dish = result[index];
		// 	var _name = _dish.getName();
		// 	var _count = _dish.getCount();
		// 	var str = "{" + '"name":' + '"' + _name + '"' + ", " + '"count":' + '"' + _count + '"' + "}";
		// 	var obj = JSON.parse(str);
		// 	DishNameAndCount.push(obj);
		// }
  //       res.json({"dish":DishNameAndCount});
        res.render('orderView', {
            dishes: result
        });
	});
};

exports.showAllDishForChangeDishCount = function(req, res) {
	Dish.fetch(function(err, result) {
		if (err) {
			console.log(err);
		}
		console.log(result);
        res.render('changeDishCount', {
            dishes: result
        });
	});
};

exports.showAllDishForDeleteDish = function(req, res) {
	Dish.fetch(function(err, result) {
		if (err) {
			console.log(err);
		}
		console.log(result);
        res.render('deleteDishView', {
            dishes: result
        });
	});
};