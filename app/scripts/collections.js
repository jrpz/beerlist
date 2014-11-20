var app = app || {};

// Collections
// =====================================
app.BeerList = Backbone.Collection.extend({

  // Assign Beer model
  model: app.Beer,

  // Return nested JSON items from service
  parse: function(res) {
    return res.response.beers.items;
  },
});
