$(function () {
    $('.o-action-toggle-enable').click(function () {
        var itemId = $('.o-id', $(this).parent().parent()).val();
        var action = $(this).text();
        var enabled = action == "上架" ? true : false;
        var _this = $(this);

        $.ajax({
            url: '/admin/menu_items/' + itemId,
            method: 'PUT',
            dataType: 'json',
            data: {
                menu_item: {
                    enabled: enabled
                }
            },
            success: function (data, status, jqXHR) {
                var tr = _this.parent().parent();
                if (enabled) {
                    _this.text("下架");
                    tr.removeClass('disabled-item');
                } else {
                    _this.text("上架");
                    tr.addClass('disabled-item');
                }
                $.notify(action + "成功", "success");
            },
            error: function (jqXHR, status, errorThrown) {
                $.notify(action + "失败", "error");
            }
        });
    });

    $('.o-action-del').click(function () {
        if (confirm("确定要删除该菜品吗？")) {
            var itemId = $('.o-id', $(this).parent().parent()).val();
            var _this = $(this);

            $.ajax({
                url: '/admin/menu_items/' + itemId,
                method: 'DELETE',
                success: function (data, status, jqXHR) {
                    $.notify("删除成功", "success");
                    _this.parent().parent().remove();
                },
                error: function (jqXHR, status, errorThrown) {
                    $.notify("删除失败", "error");
                }
            });
        }
    });
});