$(function() {
    var url = 'http://localhost:3000';
    var $dels = $('.del-button');

    $dels.on('click', function() {
        var id = this.dataset.id;

        $.ajax(url + '/daily-english/sentence/remove', {
            type: 'post',
            data: {id: id},
            error: function(jqXHR, textStatus) {

            },
            success: function(data, textStatus, jqXhr) {
                if(data.redirectUrl) {
                    alert(data.msg);
                    window.location.href = data.redirectUrl;
                }
            }
        })
    });
})