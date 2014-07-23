// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(function () {
    $('tr', $('#i-all-orders')).click(function () {
        var orderId = $('input', $(this)).val();
        window.location = '/admin/orders/' + orderId;
    });
});
