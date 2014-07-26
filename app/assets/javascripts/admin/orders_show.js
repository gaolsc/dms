$(function () {

    var updateOrderStatus = function (status) {
        $.ajax({
            url: '/admin/orders/' + $('#i-order-id').val(),
            method: 'PUT',
            dataType: 'json',
            data: {
                order: {
                    status: status
                }
            },
            success: function (data, status, jqXHR) {
                $.notify("更新状态成功", "success");
                window.location = "/admin/orders"
            },
            error: function (jqXHR, status, errorThrown) {
                $.notify("更新状态失败", "error");
            }
        });
    };

    $('#i-action-finish').click(function () {
        var statusFinish = 1;
        updateOrderStatus(statusFinish);
    });

    $('#i-action-new').click(function () {
        var statusUnFinished = 0;
        updateOrderStatus(statusUnFinished);
    });
});