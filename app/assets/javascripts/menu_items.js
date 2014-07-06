$(function () {
    var order = {};
    this.uOrders = order;

    var updateOrderItemCount = function (ctx, count) {
        $('.f-order-count', ctx).html(count);
    };

    var generateCartItem = function (id, label, count, price) {
        var tds = [];
        tds.push("<td>" + label + "</td>");
        tds.push('<td>￥' + price + '</td>');
        tds.push('<td><span class="glyphicon glyphicon-minus lg-count-minus"></span><input class="i-item-count" type="text" value="' + count + '"><span class="glyphicon glyphicon-plus lg-count-plus"></span></td>');
        tds.push('<td><span class="glyphicon glyphicon-remove lg-item-remove"></span></td>');
        var tr = "<tr id='cart-item-" + id + "'>" + tds.join('') + '</tr>';
        var tbody = $('#cart-items');
        tbody.append(tr);
    };

    var generateShoppingCart = function (orders) {
        for (var i in orders) {
            var order = orders[i];
            generateCartItem(i, order.label, order.count, order.price)
        }
    };

    var updateTotalPrice = function(orders) {
        var totalPrice = 0;
        for(var i in orders) {
            var order = orders[i];
            var itemPrice = parseFloat(order.price);
            totalPrice += itemPrice * order.count;
        }
        $('#lg-sum-price').html(totalPrice);
    };

    $('.f-action-order').click(function () {
        var id = $(this).val();
        var context = $(this).parent().parent();
        if (order[id] == null) {
            order[id] = {count: 0};
            context.parent().css('border-right', '4px solid green');
            order[id].label = $('.f-label', context).html();
            order[id].price = $('.f-price', context).html();
        }
        order[id].count += 1;
        console.log('order=', order);
        updateOrderItemCount(context, order[id].count);
    });

    $('.f-action-remove').click(function () {
        var id = $(this).val();
        var context = $(this).parent().parent();
        order[id] = null;
        updateOrderItemCount(context, 0);
        context.parent().css('border-right', 'none');
    });

    $('#f-shopping-cart').click(function () {
        $('.f-menu-container').css('display', 'none');
        $('.f-cart-items').css('display', 'block');
        generateShoppingCart(order);
        updateTotalPrice(order);
        $('#f-back-order').css('display', 'inline-block');
    });

    $('#cart-items').on('click', 'span.lg-item-remove', function () {
        $(this).parent().parent().remove();
    });

    $('#cart-items').on('click', 'span.lg-count-minus', function () {
        var itemCount = $('input.i-item-count', $(this).parent());
        var count = itemCount.val();
        if (count > 1) {
            var left = --count;
            itemCount.val(left);
        }
    });

    $('#cart-items').on( 'click', 'span.lg-count-plus',function () {
        var itemCount = $('input.i-item-count', $(this).parent());
        var count = parseInt(itemCount.val(), 10);
        itemCount.val(++count);
    });

    $('#i-make-order').click(function() {

    });
});
