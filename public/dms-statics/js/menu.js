$(function() {
    var order = {};
    this.uOrders = order;

    var updateOrderItemCount = function(ctx, count) {
        $('.f-order-count', ctx).html(count);
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
    });
});
