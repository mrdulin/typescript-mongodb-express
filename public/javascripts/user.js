/**
 * Created by Administrator on 2016/4/11.
 */
$(function () {
    var strHTMLOutput = '';
    var url = '/project/byuser/' + userId;
    $.ajax(url, {
        method: 'GET',
        dateType: 'json'
    }).done(function (data) {
        if (data && data.status === 'error') {
            strHTMLOutput = '<li>Error: ' + data.error + '</li>';
        } else if (data.length > 0) {
            var intItem,
                totalItems = data.length;
            for (intItem = totalItems - 1; intItem >= 0, intItem--;) {
                strHTMLOutput += '<li>' +
                    '<a href="/project/' + data[intItem]._id + '">' + data[intItem].projectName + '</a>' +
                    '</li>';
            }
        } else {
            strHTMLOutput = '<li>You have\'t created any projects yet.</li>';
        }
        $('#project-list').html(strHTMLOutput);
    }).fail(function () {
        console.log('ajax error');
    });
});