// Empty JS for your own code to be here

$(document).ready(function() {
    // login页面，忘记账户/密码
    $("#forget-name-pw").click(function() {
        alert("请联系系统数据库管理员");
    });

    // ----server----
    // order页面，提交点单
    $("#form-order").submit(function(event) {
        event.preventDefault();

        var orders = [];
        var errFlag = false;

        $("td > input[name='dish-check']:checked").parent().parent().each(function() {
            var name = $(this).find("td")[1].innerHTML;
            var count = parseInt($(this).find("td > input[name='order-count']").val());
            if (name === '') {
                alert("菜名为空");
                errFlag = true;
            }
            if (isNaN(count) || count < 0) {
                alert("输入的数量无效");
                errFlag = true;
            }
            if (!errFlag) {
                orders.push({
                    dishName: name,
                    count: count
                });
            }
        });

        // for (var i = 0; i < orders.length; i++)
        //     console.log(orders[i].count);

        if (orders.length > 0) {
            $.ajax({
                url: "/order",
                method: "POST",
                data: JSON.stringify({orders: orders}),
                traditional: true,
                contentType: "application/json",
                processData: false,
                success: function(data) {
                    if (data['success'] === 1) {
                        alert("点菜成功");
                    } else if (data['success'] === 0) {
                        alert("错误:" + data['error']);
                    } else {
                        alert("其他错误!!");
                    }
                    var $checkboxes = $("input[type='checkbox']");
                    for (var i = 0; i < $checkboxes.length; i++) {
                        $($checkboxes[i]).removeAttr('checked');
                    }
                    var $inputs = $("input[type='number']");
                    for (var j = 0; j < $inputs.length; j++) {
                        $($inputs[j]).val('');
                    }
                    window.location.reload();      
                }
            });
        }
    });

    // ----chief----
    // cheifViewList页面，提交order的id
    $("#form-receive-order").submit(function(event) {
        event.preventDefault();

        var orderId = $("#waiting-list").find("option:selected").attr("value");

        if (orderId !== '') {
            $.ajax({
                url: "/chiefViewList",
                method: "POST",
                data: JSON.stringify({id: orderId}),
                contentType: "application/json",
                processData: false,
                success: function(data) {
                    if (data['success'] === 1) {
                        alert("接单成功");
                    } else {
                        alert("其他错误!!");
                    }

                    window.location.reload();
                }
            });
        }
    });

    // ----manager----
    // addDish页面，添加菜品
    $("#form-add-dish").submit(function(event) {
        event.preventDefault();

        var dish = {};
        var errFlag = false;

        var name = $("input[name='dish[name]']").val();
        var price = parseInt($("input[name='dish[price]']").val());
        var quantity = parseInt($("input[name='dish[quantity]']").val());
        if (name === '') {
            alert("菜名为空");
            errFlag = true;
        }
        if (isNaN(price) || price < 0) {
            alert("输入的价格无效");
            errFlag = true;
        }
        if (isNaN(quantity) || quantity < 0) {
            alert("输入的库存量无效");
            errFlag = true;
        }
        if (!errFlag) {
            dish['name'] = name;
            dish['price'] = price;
            dish['quantity'] = quantity;

            $.ajax({
                url: "/addDish",
                method: "POST",
                data: JSON.stringify(dish),
                traditional: true,
                contentType: "application/json",
                processData: false,
                success: function(data) {
                    if (data['success'] === 1) {
                        alert("添加成功");
                    } else if (data['success'] === 0) {
                        alert("添加失败");
                    } else {
                        alert("其他错误!!");
                    }
                }
            })
        }
    });

    // deleteDish页面，提交dish的name
    $("#form-delete-dish").submit(function(event) {
        event.preventDefault();

        var dishName = $("#all-dish-list").find("option:selected").val();

        if (dishName === '') {
            alert("菜名为空");
        } else {
            $.ajax({
                url: "/deleteDish",
                method: "POST",
                data: JSON.stringify({name: dishName}),
                contentType: "application/json",
                processData: false,
                success: function(data) {
                    if (data['success'] === 1) {
                        alert("删除成功");
                    } else {
                        alert("其他错误!!");
                    }

                    window.location.reload();
                }
            });
        }
    });

    // changeDishCount页面，提交dish的新count值
    $("#form-change-count").submit(function(event) {
        event.preventDefault();

        var dish = [];
        var errFlag = false;

        $("td > input[name='dish-check']:checked").parent().parent().each(function() {
            var name = $(this).find("td")[1].innerHTML;
            var count = parseInt($(this).find("td > input[name='count']").val());
            if (name === '') {
                alert("菜名为空");
                errFlag = true;
            }
            if (isNaN(count) || count < 0) {
                alert(name + "输入的数量无效");
                errFlag = true;
            }
            if (!errFlag) {
                dish.push({
                    dishName: name,
                    count: count
                });
            }
        });

        $.ajax({
            url: "/changeDishCount",
            method: "POST",
            data: JSON.stringify({dish: dish}),
            traditional: true,
            contentType: "application/json",
            processData: false,
            success: function(data) {
                if (data['success'] === 1) {
                    alert("修改成功");
                } else if (data['success'] === 0) {
                    alert("错误:" + data['error']);
                } else {
                    alert("其他错误!!");
                }
                
                var $checkboxes = $("#form-change-count input[type='checkbox']");
                for (var i = 0; i < $checkboxes.length; i++) {
                    $($checkboxes[i]).removeAttr('checked');
                }
                var $inputs = $("#form-change-count input[type='number']");
                for (var j = 0; j < $inputs.length; j++) {
                    $($inputs[j]).val('');
                }
                window.location.reload();           
            }
        });
    });
});
