var app = app || {};

// Models
// ====================================

// -------------------------------------
// Beer Model
// -------------------------------------
app.Beer = Backbone.Model.extend({});


// -------------------------------------
// User Model
// -------------------------------------
app.User = Backbone.Model.extend({

  // Using jrpz for initiating user
  defaults: {
    'user_name': 'jrpz'
  },

  // Untappd API url for user/info
  url: function() {
    var userName = this.get('user_name');
    return buildAPIUrl('user/info/', userName);
  },

  // Return nested JSON items from service
  parse: function(res) {
    return res.response.user;
  }
});