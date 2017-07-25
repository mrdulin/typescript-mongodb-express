$(function () {

  var $dels = $('.del-button');

  $dels.on('click', function () {
    var id = this.dataset.id;

    $.ajax('/daily-english/sentence/remove', {
      type: 'post',
      data: { id: id },
      error: function (jqXHR, textStatus, error) {
        console.log('删除失败, %s', error);
      },
      success: function (data, textStatus, jqXhr) {
        if (data.redirectUrl) {
          console.log('删除成功')
          window.location.href = data.redirectUrl;
        }
      }
    })
  });
})
