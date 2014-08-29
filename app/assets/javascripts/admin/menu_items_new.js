$(function () {
    $('#i-btn-new-menu-item').click(function () {
        var hasError = false;
        var _label = $('#i-menu-label').val();
        if ($.trim(_label) == '') {
            $.notify('菜品名称不能为空', "error");
            hasError = true;
        }
        var price = $.trim($('#i-item-price').val());
        if (price == '') {
            $.notify('菜品价格不能为空', "error");
            hasError = true;
        }
        if(!/\d+(?:\.\d+)?/.test(price)) {
            $.notify('菜品价格格式不正确', "error");
            hasError = true;
        }
        if ($.trim($('#i-item-preview').val()) == '') {
            $.notify('预览不能为空', "error");
            hasError = true;
        }
        if (!hasError) {
            $('#i-menu-item-new-form').submit();
        }
    });
});
