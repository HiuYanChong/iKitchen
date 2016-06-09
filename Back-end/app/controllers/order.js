var Order = require("../models/order.js");
var Dish = require('../models/dish.js');

//showAllOrder
exports.showAllOrder = function(req, res) {
    Order.fetch(function(err, orders) {
        if(err) {
            console.log(err);
        }
        console.log(orders);
        res.render('chiefViewList', {
            order:orders
        });
    });
};

//addOrder
exports.addOrder = function(req, res) {
    var orders = req.body.orders;
    var hasAllDish = []; //用于判断该单的菜品是否全部存在并且库存充足
    //检查所点菜品是否存在和菜品库存是否满足需求后的回调函数
    function cb(res) {
        if (hasAllDish.every(isAllDone) && hasAllDish.length == orders.length) {
            for (var index = 0; index < orders.length; index++) {
                var order1 = orders[index];
                var _name1 = order1.dishName;
                var _count1 = order1.count;
                var finish_count = 0;
                /*for (var j = 0; j < _count1; j++) {
                    createOrder(_name1,res);
                }*/
                createOrder(_name1, finish_count, _count1, res);
            }
            res.json({success:1});
        } else {
            var errorMessage = '';
            hasAllDish.forEach(function(item, index, array) {
                if (item === 0 || item === "0") {
                    errorMessage += "没有 "+orders[index].dishName+" 菜品";
                    errorMessage += "或 "+orders[index].dishName+" 菜品库存不足; ";
                }
            });
            console.log(errorMessage);
            res.json({success:0, error:errorMessage});
        }
    }
    //检查所点菜品是否存在和菜品库存是否满足需求
    function haveDish(_name, _count, _length, length, res) {
        Dish.findByName(_name, function(err, dish) {
            if(err) {
                console.log(err);
            } else if (dish) {
                var countNow = dish.getCount();     
                if (_count <= countNow) {
                    hasAllDish.push("1");
                } else {
                    hasAllDish.push("0");
                }
            } else {
                hasAllDish.push("0");          
            }
            if (_length == length) {
                cb(res);
            }
        });      
    }
    
    for (var i = 0; i < orders.length; i++) {
        var order = orders[i];
        var _name = order.dishName;
        var _count = order.count;
        var _length = i + 1;
        haveDish(_name, _count, _length, orders.length, res);
    } 
};

//用于验证数组所有项是否都为1
function isAllDone(ele, index, array) {
    return ele == 1;
}

//创建一个order
function createOrder(_name, finish_count, _count1, res) {
    //先减少菜品库存，再创建order
    Dish.findByName(_name, function(err, dish) {
        if (err) {
            console.log(err);
        }
        var countNow = dish.getCount();
        console.log(countNow);
        if (countNow > 0) {
            dish.setCount(countNow - 1);
        }
        Order.create({
            name: _name,
        }, function(err, order) {
            if (err) {
                console.log(err);
                res.json({success:0, errr:"创建 "+_name+" order失败"});
            }
            finish_count++;
            if (finish_count < _count1) {
                createOrder(_name, finish_count, _count1, res);
            }
        });
    });   
}



//finishOrder
exports.finishOrder = function(req, res) {
    //使用order对应的id,才能确定其唯一性
    var id = req.body.id;
    if (id) {
        Order.remove({_id:id}, function(err, order) {
            if (err) {
                console.log(err);
                res.json({success:0});
            } else {
                res.json({success:1});
            }
        });
    }
};
