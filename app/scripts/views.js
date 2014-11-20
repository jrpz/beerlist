var app = app || {};

// Views
// =====================================

// -------------------------------------
// User View
// -------------------------------------
app.UserView = Backbone.View.extend({
  el: '#user',

  // grab template from index.html
  template: _.template($('#user-template').html()),

  initialize: function() {
    // wait for user model to change or reset before rendering
    this.listenTo(this.model, 'change reset', this.render);
  },

  // user actions
  events: {
    'click #view-recent-beers-btn': 'viewBeers'
  },

  // add the model data to this dom element
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  // Beers!
  viewBeers: function() {
    // create new beer collection and corresponding view
    var beerList = new app.BeerList();
    var beerListView = new app.BeerListView({collection: beerList});

    // Set the collection url with this model's user name
    beerList.url = buildAPIUrl('user/beers/', this.model.get('user_name'));

    // Get some beer data
    beerList.fetch({reset: true});

    // Display beerList
    $('#beers').html(beerListView.el);
  }
});


// -------------------------------------
// Single Beer View
// -------------------------------------
app.BeerView = Backbone.View.extend({

  // use an article tag
  tagName: 'article',

  // .beer class
  className: 'beer',

  // grab template from index.html
  template: _.template($('#beer-template').html()),

  // set element additional attributes
  attributes: function () {
    return {
      'data-beer-style': this.model.get('beer').beer_style,
      'data-beer-abv':   this.model.get('beer').beer_abv
    }
  },

  // render the element with template
  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );
    return this;
  }
});


// -------------------------------------
// Beer Collection View
// -------------------------------------
app.BeerListView = Backbone.View.extend({

  // use a section tag
  tagName: 'section',

  // init view.
  initialize: function() {
    // wait for a collection reset before rendering
    this.listenTo(this.collection, 'reset', this.addBeers);
  },

  // Add rendered beer to this element
  addBeer: function(beer) {
    var beerView = new app.BeerView({ model: beer });
    this.$el.append(beerView.render().el);
  },

  addBeers: function() {
    // Step thru the collection
    this.collection.each(function(beer) {
      this.addBeer(beer);
    }, this);
  }
});


// -------------------------------------
// Search Bar View
// -------------------------------------
app.SearchUserView = Backbone.View.extend({
  // Use existing form
  el: '#user-name-form',

  // When user submits form, run search
  events: {
    'submit': 'searchUser'
  },

  // Rebuild collection with givien username
  searchUser: function() {
    // Get userName from form
    var userName = $('#user-name').val();

    // Clear out containers
    $('#user').html('');
    $('#beers').html('');

    // Create a new user & user view
    var user = new app.User({'user_name': userName});
    var userView = new app.UserView({model: user});

    // Fetch and Reset the user data
    user.fetch({reset: true});

    return false;
  }
});