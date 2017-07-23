/**
 * Created by Administrator on 2016/4/7.
 */
$(function () {

  var $h1 = $('h1');
  var $zipInput = $('input[name="zip"]');

  $('form').submit(function (e) {
    e.preventDefault();

    var zipcode = $.trim($zipInput.val());
    $h1.text('loading...');

    var request = $.ajax({
      url: '/zipcode-forecast/' + zipcode,
      dataType: 'json'
    });

    request.done(function (data) {
      if (data.zipcode) {
        $h1.html('It is ' + data.temperature + '&#176; in ' + data.zipcode + '.');
      } else {
        $h1.text(data.msg);
      }
    });

    request.fail(function (jqxhr, textStatus, errorThrown) {
      $h1.text(errorThrown);
    });

  });
});
