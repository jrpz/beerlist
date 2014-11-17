// Helpers 
// ========================================
var CLIENT_ID_SECRET = '?client_id=BEE5D99036C1A685A993F03F2112D91372339C48&client_secret=923B3926CB8482D5AF8CCC7661929E129DA4FAC0',
    UNTAPPD_BASE_URL = 'https://api.untappd.com/v4/',
    DEFAULT_USERNAME = 'jrpz';

var buildAPIUrl = function (method, userName) {
  userName = userName || DEFAULT_USERNAME;
  return UNTAPPD_BASE_URL + method + userName + CLIENT_ID_SECRET;
};