webgoat.customjs.simpleXXE = function () {
    var commentInput = $("#commentInputSimple").val();
    var xml = '<?xml version="1.0"?>' +
        '<comment>' +
        '  <text>' + commentInput + '</text>' +
        '</comment>';
    return xml;
}

webgoat.customjs.simpleXXECallback = function() {
    $("#commentInputSimple").val('');
    getComments('#commentsListSimple');
}

$(document).ready(function () {
    getComments('#commentsListSimple');
});

//// Content-type

webgoat.customjs.contentTypeXXE = function() {
    var commentInput = $("#commentInputContentType").val();
    return JSON.stringify({text: commentInput});
}

webgoat.customjs.contentTypeXXECallback = function() {
    $("#commentInputContentType").val('');
    getComments('#commentsListContentType');
}

$(document).ready(function () {
    getComments('#commentsListContentType');
});


//// Blind

webgoat.customjs.blindXXE = function() {
    var commentInput = $("#commentInputBlind").val();
    var xml = '<?xml version="1.0"?>' +
        '<comment>' +
        '  <text>' + commentInput + '</text>' +
        '</comment>';
    return xml;
}

webgoat.customjs.blindXXECallback = function() {
    $("#commentInputBlind").val('');
    getComments('#commentsListBlind');
}

$(document).ready(function () {
    getComments('#commentsListBlind');
});



function getComments(field) {
    $.ajax({
        url: 'xxe/comments',
        type: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (result, status) {
            $(field).empty();
            for (var i = 0; i < result.length; i++) {
                var comment = $('<li>').addClass('comment');
                var div1 = $('<div>').addClass('pull-left');
                var img = $('<img>').addClass('avatar').attr('src', 'images/avatar1.png').attr('alt', 'avatar');
                div1.append(img);
                comment.append(div1);
                var div2 = $('<div>').addClass('comment-body');
                var div3 = $('<div>').addClass('comment-heading');
                var h4 = $('<h4>').addClass('user').text(result[i].user);
                var h5 = $('<h5>').addClass('time').text(result[i].dateTime);
                div3.append(h4);
                div3.append(h5);
                div2.append(div3);
                var p = $('<p>').text(result[i].text);
                div2.append(p);
                comment.append(div2);
                $(field).append(comment);
            }
        }

    });
}
