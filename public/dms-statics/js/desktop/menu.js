$(function () {
    var cart = {};

    $('.btn-order').click(function () {
        var addItem2Cart = function (id, label, price) {
            var tr = $("<tr id='cart-item-" + id + "'></tr>");
            var tbody = $('#cart-items');
            tr.append($("<td>" + label + "</td>"));
            tr.append($('<td>' + price + '</td>'));
            tr.append($('<td><span class="glyphicon glyphicon-minus lg-count-minus"></span><input class="i-item-count" style="width:30px;" type="text" value="1"><span class="glyphicon glyphicon-plus lg-count-plus"></span></td>'));
            tr.append($('<td><span class="glyphicon glyphicon-remove lg-item-remove"></span></td>'));
            tbody.append(tr);
            cart[id] = {count:1};
        };

        var incrementItemCountInCart = function (id) {
            var itemCount = $('input.i-item-count', $('#cart-item-' + id));
            var count = itemCount.val();
            itemCount.val(++count);
            cart[id].count += 1;
        };

        var self = $(this);
        var id = self.val();
        var context = self.parent().parent();
        var label = $('h3', context).text();
        var price = $('.badge', context).text();
        console.log(label, price);
        var isItemInCart = $('#' + 'cart-item-' + id).size() > 0;
        if (!isItemInCart) {
            addItem2Cart(id, label, price);
        } else {
            incrementItemCountInCart(id);
        }
    });

    $('#cart-items').on( 'click', 'span.lg-count-plus',function () {
        var itemCount = $('input.i-item-count', $(this).parent());
        var count = parseInt(itemCount.val(), 10);
        console.log(count, $(this).parent().html());
        itemCount.val(++count);
    });

    $('#cart-items').on('click', 'span.lg-count-minus', function () {
        var itemCount = $('input.i-item-count', $(this).parent());
        var count = itemCount.val();
        if (count > 1) {
            itemCount.val(--count);
        }
    });
});