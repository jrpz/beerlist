// BeerList Application
// =====================================
var app = app || {};

// Application View
app.AppView = Backbone.View.extend({

  initialize: function() {
    // Load Search Bar
    var searchUserView = new app.SearchUserView();

    // Create a new User Model
    var user = new app.User();

    // Crate new User View with new user
    var userView = new app.UserView({model: user});
    
    // Fetch User data to kick things off.
    user.fetch({reset: true});
  }
});

// On document ready, run the app
$(function() {
  new app.AppView();
})
