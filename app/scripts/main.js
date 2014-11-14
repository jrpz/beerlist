/*
 *  main.js
 *
 *  Application that grabs Untappd Beer list and badges
 */

var CLIENT_ID_SECRET = '?client_id=BEE5D99036C1A685A993F03F2112D91372339C48&client_secret=923B3926CB8482D5AF8CCC7661929E129DA4FAC0',
      UNTAPPD_BASE_URL = 'https://api.untappd.com/v4/',
      DEFAULT_USERNAME = 'jrpz';

// Get the list of distinct beers
var displayBeers = function (userName) {
  userName = userName || DEFAULT_USERNAME;
  var distinct_beers_url = UNTAPPD_BASE_URL + 'user/beers/' + userName + CLIENT_ID_SECRET;
  $.getJSON(distinct_beers_url, function (data) {
    $.each(data.response.beers.items, function (i, item) {
      $('#beers').append('<div class="col-lg-2 beer"><img src="' + item.beer.beer_label + '"></div>');
      // $('#beers').append('<li>' + item.beer.beer_name + ' - ' + item.brewery.brewery_name + '</li>');
    });
  });
}

// Get badges
var displayBadges = function (userName) {
  userName = userName || DEFAULT_USERNAME;
  var badges_url = UNTAPPD_BASE_URL + 'user/badges/' + userName + CLIENT_ID_SECRET;
  
  $.getJSON(badges_url, function (data) {
    $.each(data.response.items, function (i, item) {
      $('#badges').append('<div class="col-lg-2 badge"><img src="' + item.media.badge_image_md + '"></div>');
      // $('#badges').append('<h4>' + item.badge_name + '</h4>');
      // $('#badges').append('<p>' + item.badge_description + '</p></div>');
    });
  });
}

$(document).ready(function () {
  // Global variables
  displayBeers();
  displayBadges();

  $('#user-name-form').submit(function (event) {
    var userName = $('#user-name').val();
    displayBeers(userName);
    displayBadges(userName);
    event.preventDefault();
  });
});