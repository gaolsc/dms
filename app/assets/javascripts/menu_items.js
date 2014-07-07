$(function () {
    var order = {};
    this.uOrders = order;

//    var updateOrderItemCount = function (ctx, count) {
//        $('.f-order-count', ctx).html(count);
//    };

    var generateCartItem = function (id, label, count, price) {
        var tds = [];
        tds.push("<td>" + label + "</td>");
        tds.push('<td>￥' + price + '</td>');
//        tds.push('<td><span class="glyphicon glyphicon-minus lg-count-minus"></span><input class="i-item-count" type="text" value="' + count + '"><span class="glyphicon glyphicon-plus lg-count-plus"></span></td>');
        tds.push('<td><span class="lg-item-remove">删除<input type="hidden" value="' + id + '"></span></td>');
        return "<tr id='cart-item-" + id + "'>" + tds.join('') + '</tr>';
    };

    var calcSum = function (orders) {
        var count = 0;
        var price = 0;
        for (var order in orders) {
            count += orders[order].count;
            price += orders[order].price;
        }
        return {count: count, price: price};
    };

    var updateSummery = function (count, price) {
        $('#i-order-count').html(count);
        $('#i-total-price').html(price);
    };

    var generateShoppingCart = function (orders) {
        var items = [];
        for (var i in orders) {
            var order = orders[i];
            items.push(generateCartItem(i, order.label, order.count, order.price));
        }
        var tbody = $('#cart-items');
        tbody.html(items.join(''));
    };

    var updateTotalPrice = function (orders) {
        var totalPrice = 0;
        for (var i in orders) {
            var order = orders[i];
            var itemPrice = order.price;
            totalPrice += itemPrice * order.count;
        }
        $('#i-checkout-price').html(totalPrice);
    };

    $('.f-preview-container').click(function () {
        var ctx = $(this).parent();
        var mask = $('.f-mask', ctx)
        var id = $('input', ctx).val();

        if (mask.is(':visible')) {
            mask.hide();
            delete order[id];
            if ($.isEmptyObject(order)) {
                $('#i-navtop-order').hide();
            }
        } else {
            if (order[id] == null) {
                order[id] = {count: 0};
                order[id].label = $('.f-label', ctx).html();
                order[id].price = parseFloat($('.f-price', ctx).html());
            }
            order[id].count += 1;
            $('#i-navtop-order').show();
            $('.f-mask', ctx).show();
        }
        var sums = calcSum(order);
        updateSummery(sums.count, sums.price);
    });

//    $('.f-action-remove').click(function () {
//        var id = $(this).val();
//        var context = $(this).parent().parent();
//        order[id] = null;
//        updateOrderItemCount(context, 0);
//        context.parent().css('border-right', 'none');
//    });

//    $('#f-shopping-cart').click(function () {
//        $('.f-menu-container').css('display', 'none');
//        $('.f-cart-items').css('display', 'block');
//        generateShoppingCart(order);
//        updateTotalPrice(order);
//        $('#f-back-order').css('display', 'inline-block');
//    });

    $('#i-order-confirm').click(function () {
        $('.f-menu-container').hide();
        $('#i-navtop-order').hide();
        $('.f-cart-items').show();
        generateShoppingCart(order);
        updateTotalPrice(order);
        $('#i-navtop-checkout').show();
    });

    $('#cart-items').on('click', 'span.lg-item-remove', function () {
        var id = $('input', $(this)).val();
        delete order[id];
        $(this).parent().parent().remove();
        updateTotalPrice(order);
    });

//    $('#cart-items').on('click', 'span.lg-count-minus', function () {
//        var itemCount = $('input.i-item-count', $(this).parent());
//        var count = itemCount.val();
//        if (count > 1) {
//            var left = --count;
//            itemCount.val(left);
//        }
//    });
//
//    $('#cart-items').on('click', 'span.lg-count-plus', function () {
//        var itemCount = $('input.i-item-count', $(this).parent());
//        var count = parseInt(itemCount.val(), 10);
//        itemCount.val(++count);
//    });

    $('#i-back-order').click(function () {
        $('.f-cart-items').hide();
        $('#i-navtop-checkout').hide();
        var sums = calcSum(order);
        updateSummery(sums.count, sums.price);
        $('.f-menu-container').show();
        if (sums.count > 0) {
            $('#i-navtop-order').show();
        }
    });

    $('#i-make-order').click(function () {

    });
});
