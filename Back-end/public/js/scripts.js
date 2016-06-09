// Empty JS for your own code to be here

$(document).ready(function() {
    // login页面，忘记账户/密码
    $("#forget-name-pw").click(function() {
        alert("请联系系统数据库管理员");
    });

    // order页面，提交点单
    $("#form-order").submit(function(event) {
        event.preventDefault();

        var orders = [];

        $("td > input[name='dish-check']:checked").parent().parent().each(function() {
            var name = $(this).find("td")[1].innerHTML;
            var count = $(this).find("td > input[name='order-count']").val();
            if (name !== '' && count !== '') {
                orders.push({
                    dishName: name,
                    count: count
                });
            }
        });

        for (var i = 0; i < orders.length; i++)
            console.log(orders[i].dishName);

        $.ajax({
            url: "/order",
            method: "POST",
            data: JSON.stringify({orders: orders}),
            traditional: true,
            contentType: "application/json",
            processData: false,
            success: function(data) {
                if (data['success'] === 1) {
                    alert("点菜成功\n");
                } else if (data['success'] === 0) {
                    alert("错误:\n" + data['error']);
                } else {
                    alert("其他错误!!");
                }

                window.location.reload();
            }
        });
    });

    // cheifViewList页面，提交order的id
    $("#form-receive-order").submit(function(event) {
        event.preventDefault();

        var orderId = $("#waiting-list").find("option:selected").attr("value");

        $.ajax({
            url: "/chiefViewList",
            method: "POST",
            data: JSON.stringify({id: orderId}),
            contentType: "application/json",
            processData: false,
            success: function(data) {
                if (data['success'] === 1) {
                    alert("接单成功\n");
                } else {
                    alert("其他错误!!");
                }

                window.location.reload();
            }
        });
    });

    // deleteDish页面，提交dish的name
    $("#form-delete-dish").submit(function(event) {
        event.preventDefault();

        var dishName = $("#all-dish-list").find("option:selected").val();

        $.ajax({
            url: "/deleteDish",
            method: "POST",
            data: JSON.stringify({name: dishName}),
            contentType: "application/json",
            processData: false,
            success: function(data) {
                if (data['success'] === 1) {
                    alert("删除成功\n");
                } else {
                    alert("其他错误!!");
                }

                window.location.reload();
            }
        });
    });

    // changeDishCount页面，提交dish的新count值
    $("#form-change-count").submit(function(event) {
        event.preventDefault();

        var dish = [];

        $("td > input[name='dish-check']:checked").parent().parent().each(function() {
            var name = $(this).find("td")[1].innerHTML;
            var count = $(this).find("td > input[name='count']").val();
            if (name !== '' && count !== '') {
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
                    alert("修改成功\n");
                } else if (data['success'] === 0) {
                    alert("错误:\n" + data['error']);
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
