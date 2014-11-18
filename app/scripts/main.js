/*
 *  main.js
 *
 *  Application that grabs Untappd Beer list and badges
 */

// Models
// ====================================
var Beer = Backbone.Model.extend({});


// Collections
// =====================================
var BeerList = Backbone.Collection.extend({
  model: Beer,
  url: buildAPIUrl('user/beers/'),

  
});


// Views
// =====================================
// Individual Beer View
var BeerView = Backbone.View.extend({
  tagName: 'article',
  className: 'beer',
  template: _.template($('#beer-template').html()),

  attributes: function () {
    return {
      'data-beer-style': this.model.beer.beer_style,
      'data-beer-abv':   this.model.beer.beer_abv
    }
  },

  render: function() {
    this.$el.html(this.template( this.model ));
    return this;
  }
});

// Beer Collection View
var BeerListView = Backbone.View.extend({
  tagName: 'section',

  initialize: function() {
    var that = this;
    this.collection.fetch({
      success: function(method, collection) {
        _.each(collection.response.beers.items, function (beer){
          that.addBeer(beer);
        })
      }
    });
  },

  addBeer: function(beer) {
    var beerView = new BeerView({ model: beer });
    this.$el.append(beerView.render().el);
  },
});

// Filter Beers by abv and style
var BeerFilterView = Backbone.View.extend({
    el: '#beer-filter',


});

// Avg abv
var BeerStatsView = Backbone.View.extend({

})


// Search Bar View
var SearchUserView = Backbone.View.extend({
  el: '#user-name-form',

  events: {
    'submit': 'searchUser'
  },

  searchUser: function() {
    var userName = $('#user-name').val();
    var beerList = new BeerList();
    beerList.url = buildAPIUrl('user/beers/', userName);
    var beerListView = new BeerListView({collection: beerList});
    $('#beers').html(beerListView.render().el);
    return false;
  }
});

// Application View
var AppView = Backbone.View.extend({
  initialize: function() {
    var searchUserView = new SearchUserView();

    var beerList = new BeerList();
    var beerListView = new BeerListView({collection: beerList});
    $('#beers').html(beerListView.render().el);

  },

});

// Run all the stuff
$(function() {
  new AppView();
});
