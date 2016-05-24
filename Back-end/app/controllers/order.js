var Order = require("../models/order.js");

//showAllOrder
exports.showAllOrder = function(req, res) {
    Order.fetch(function(err, orders) {
        if(err) {
            console.log(err);
        }
        console.log(orders);
        res.json({
            order:orders
        });
    });
};

//addOrder
exports.addOrder = function(req, res) {
    var orders = req.body.orders;
    console.log(orders);
    for (var i = 0; i < orders.length; i++) {
        var order = orders[i];
        var _name = order.dishName;
        var _count = order.count;
        for (var j = 0; j < _count; j++) {
            createOrder(_name,res);
        }
    }
    res.send();
};

//创建dish之后的回调函数
function createOrder(_name,res) {
    Order.create({
        name: _name,
    }, function(err, order) {
        if (err) {
            console.log(err);
            res.append("0");
        } else {
            res.append("1");
        }
    });
}

//finishOrder
exports.finishOrder = function(req, res) {
    //使用order对应的id,才能确定其唯一性
    var id = req.body.id;
    if (id) {
        Order.remove({_id:id}, function(err, movie) {
            if (err) {
                console.log(err);
                res.json({success:0});
            } else {
                res.json({success:1});
            }
        });
    }
};
