// Helpers
// ========================================
var buildAPIUrl = function (method, userName) {
  var untappdBaseAPIUrl = 'https://api.untappd.com/v4/',
      clientIdSecret = '?client_id=BEE5D99036C1A685A993F03F2112D91372339C48&client_secret=923B3926CB8482D5AF8CCC7661929E129DA4FAC0';

  return untappdBaseAPIUrl + method + userName + clientIdSecret;
};
