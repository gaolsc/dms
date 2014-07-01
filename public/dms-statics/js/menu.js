$(function() {
    var order = {};
    this.uOrders = order;

    var updateOrderItemCount = function(ctx, count) {
        $('.f-order-count', ctx).html(count);
    };

    var generateCartItem = function (id, label, count, price) {
        var tds = [];
        tds.push("<td>" + label + "</td>");
        tds.push('<td>￥' + price + '</td>');
        tds.push('<td><span class="glyphicon glyphicon-minus lg-count-minus"></span><input class="i-item-count" type="text" value="' + count + '"><span class="glyphicon glyphicon-plus lg-count-plus"></span></td>');
        tds.push('<td><span class="glyphicon glyphicon-remove lg-item-remove"></span></td>');
        var tr =  "<tr id='cart-item-" + id + "'>" + tds.join('') + '</tr>';
        var tbody = $('#cart-items');
        tbody.append(tr);
    };

    var generateShoppingCart = function(orders) {
        for(var i in orders) {
            var order = orders[i];
            generateCartItem(i, order.label, order.count, order.price)
        }
    };

    $('.f-action-order').click(function() {
        var id = $(this).val();
        var context = $(this).parent().parent();
        if(order[id] == null) {
            order[id] = {count:0};
            context.parent().css('border-right', '4px solid green');
        }
        order[id].count += 1;
        order[id].label = $('.f-label', context).html();
        order[id].price = $('.f-price', context).html();
        console.log('order=', order);
        updateOrderItemCount(context, order[id].count);
    });

    $('.f-action-remove').click(function() {
        var id = $(this).val();
        var context = $(this).parent().parent();
        order[id] = null;
        updateOrderItemCount(context, 0);
        context.parent().css('border-right', 'none');
    });

    $('#f-shopping-cart').click(function() {
        $('.f-menu-container').css('display', 'none');
        $('.f-cart-items').css('display', 'block');
        generateShoppingCart(order);
    });
});
