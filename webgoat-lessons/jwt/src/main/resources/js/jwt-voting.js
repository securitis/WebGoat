$(document).ready(function () {
    loginVotes('Guest');
})

function loginVotes(user) {
    $("#name").text(user);
    $.ajax({
        url: 'JWT/votings/login?user=' + user,
        contentType: "application/json"
    }).always(function () {
        getVotings();
    })
}

var html = '<a href="#" class="list-group-item ACTIVE">' +
    '<div class="media col-md-3">' +
    '<figure> ' +
    '<img class="media-object img-rounded" src="images/IMAGE_SMALL" alt="placehold.it/350x250"/>' +
    '</figure>' +
    '</div> ' +
    '<div class="col-md-6">' +
    '<h4 class="list-group-item-heading">TITLE</h4>' +
    '<p class="list-group-item-text">INFORMATION</p>' +
    '</div>' +
    '<div class="col-md-3 text-center">' +
    '<h2 HIDDEN_VIEW_VOTES>NO_VOTES' +
    '<small HIDDEN_VIEW_VOTES> votes</small>' +
    '</h2>' +
    '<button type="button" id="TITLE" class="btn BUTTON btn-lg btn-block" onclick="vote(this.id)">Vote Now!</button>' +
    '<div style="visibility:HIDDEN_VIEW_RATING;" class="stars"> ' +
    '<span class="glyphicon glyphicon-star"></span>' +
    '<span class="glyphicon glyphicon-star"></span>' +
    '<span class="glyphicon glyphicon-star"></span>' +
    '<span class="glyphicon glyphicon-star-empty"></span>' +
    '</div>' +
    '<p HIDDEN_VIEW_RATING>Average AVERAGE<small> /</small>4</p>' +
    '</div>' +
    '<div class="clearfix"></div>' +
    '</a>';

function getVotings() {
    $("#votesList").empty();
    $.get("JWT/votings", function (result, status) {
        for (var i = 0; i < result.length; i++) {
            var voteTemplate = $(html);
            voteTemplate.find('.media-object').attr('src', result[i].imageSmall);
            if (i === 0) {
                voteTemplate.addClass('active');
                voteTemplate.find('.btn').removeClass('btn-primary').addClass('btn-default');
            } else {
                voteTemplate.removeClass('active');
                voteTemplate.find('.btn').removeClass('btn-default').addClass('btn-primary');
            }
            voteTemplate.find('.list-group-item-heading').text(result[i].title);
            voteTemplate.find('.list-group-item-text').text(result[i].information || '');
            voteTemplate.find('[HIDDEN_VIEW_VOTES]').text(result[i].numberOfVotes || '').removeAttr('hidden');
            voteTemplate.find('[HIDDEN_VIEW_RATING]').text('Average ' + (result[i].average || '') + ' / 4').removeAttr('hidden');
            $("#votesList").append(voteTemplate);
        }
    })
}

webgoat.customjs.jwtSigningCallback = function () {
    getVotings();
}

function vote(title) {
    var user = $("#name").text();
    if (user === 'Guest') {
        alert("As a guest you are not allowed to vote, please login first.")
    } else {
        $.ajax({
            type: 'POST',
            url: 'JWT/votings/' + title
        }).then(
            function () {
                getVotings();
            }
        )
    }
}

