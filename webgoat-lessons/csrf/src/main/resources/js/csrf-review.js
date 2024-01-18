$(document).ready(function () {
//    $("#postReview").on("click", function () {
//        var commentInput = $("#reviewInput").val();
//        $.ajax({
//            type: 'POST',
//            url: 'csrf/review',
//            data: JSON.stringify({text: commentInput}),
//            contentType: "application/json",
//            dataType: 'json'
//        }).then(
//            function () {
//                getChallenges();
//                $("#commentInput").val('');
//            }
//        )
//    });

    var html = '<li class="comment">' +
        '<div class="pull-left">' +
        '<img class="avatar" alt="avatar"/>' +
        '</div>' +
        '<div class="comment-body">' +
        '<div class="comment-heading">' +
        '<h4 class="user"></h4>' +
        '<h5 class="time"></h5>' +
        '</div>' +
        '<p></p>' +
        '</div>' +
        '</li>';

    getChallenges();

    function getChallenges() {
        $("#list").empty();
        $.get('csrf/review', function (result, status) {
            for (var i = 0; i < result.length; i++) {
                var comment = $(html);
                comment.find('.user').text(result[i].user);
                comment.find('.time').text(result[i].dateTime);
                comment.find('p').text(result[i].text);
                comment.find('.avatar').attr('src', 'images/avatar1.png');
                comment.find('.user').append(' / ' + result[i].stars + ' stars');
                $("#list").append(comment);
            }

        });
    }
})