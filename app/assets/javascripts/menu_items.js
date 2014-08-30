$(function () {
    var order = {};
    this.uOrders = order;
    var orderSubmitted = false;

    var generateCartItem = function (id, label, count, price) {
        var tds = [];
        tds.push("<td>" + label + "</td>");
        tds.push('<td>￥' + price + '</td>');
        tds.push('<td><span class="lg-item-remove">删除<input type="hidden" value="' + id + '"></span></td>');
        return "<tr id='cart-item-" + id + "'>" + tds.join('') + '</tr>';
    };

    var saveShipAddressLocal = function () {
        if (window.localStorage) {
            localStorage.setItem("i-tel", $.trim($('#i-tel').val()));
            localStorage.setItem("i-customer", $.trim($('#i-customer').val()));
            localStorage.setItem("i-ship-address", $.trim($('#i-ship-address').val()));
        }
    };

    var loadShipAddress = function () {
        if (window.localStorage) {
            $('#i-tel').val(localStorage.getItem('i-tel'));
            $('#i-customer').val(localStorage.getItem('i-customer'));
            $('#i-ship-address').val(localStorage.getItem('i-ship-address'));
        }
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

    var updateSelected = function (orders) {
        $.each($('.f-menu-item'), function (i, item) {
            var itemId = $(item).children('input').val();
            var mask = $('.f-mask', $(item));
            if (!orders[itemId]) {
                mask.hide();
            }
        });
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

    $('#i-order-confirm').click(function () {
        $('.f-menu-container').hide();
        $('#i-navtop-order').hide();
        $('.f-cart-items').show();
        generateShoppingCart(order);
        updateTotalPrice(order);
        $('#i-navtop-checkout').show();
        loadShipAddress();
    });

    $('#cart-items').on('click', 'span.lg-item-remove', function () {
        var id = $('input', $(this)).val();
        delete order[id];
        $(this).parent().parent().remove();
        updateTotalPrice(order);
    });

    $('#i-back-order').click(function () {
        $('.f-cart-items').hide();
        $('#i-navtop-checkout').hide();
        var sums = calcSum(order);
        updateSummery(sums.count, sums.price);
        updateSelected(order);
        $('.f-menu-container').show();
        if (sums.count > 0) {
            $('#i-navtop-order').show();
        }
    });

    var checkContact = function () {
        if ($.trim($('#i-tel').val()) == '') {
            $.notify('联系电话不能为空', "error");
            return false;
        }
        if ($.trim($('#i-customer').val()) == '') {
            $.notify('联系人不能为空', "error");
            return false;
        }
        if ($.trim($('#i-ship-address').val()) == '') {
            $.notify('配送地址不能为空', "error");
            return false;
        }
        return true;
    };

    $('#i-order-checkout').click(function () {
        if (!checkContact()) {
            return;
        }

        var orders = {};
        var hasOrder = false;
        for (var o in order) {
            hasOrder = true;
            orders[o] = order[o].count;
        }

        if (!hasOrder) {
            $.notify('购物车里什么也没有哦', 'info')
            return;
        }

        $.ajax({
            url: '/orders',
            method: 'POST',
            dataType: 'json',
            data: {
                contact: {
                    realname: $('#i-customer').val(),
                    tel: $('#i-tel').val(),
                    ship_address: $('#i-ship-address').val()
                },
                orders: orders
            },
            beforeSend: function (jqXHR, o) {
                saveShipAddressLocal();
                if (orderSubmitted) {
                    $.notify("订单正在处理中", "info");
                    return false;
                } else {
                    orderSubmitted = true;
                }
            },
            success: function (data, status, jqXHR) {
                $.notify("订单提交成功", "success");
                order = {};
                $('#i-back-order').trigger('click');
            },
            error: function (jqXHR, status, errorThrown) {
                $.notify("订单未能提交", "error");
            },
            complete: function (jqXHR, status) {
                orderSubmitted = false;
            }
        });
    });
});
