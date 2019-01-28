/**
 * Midas is a suite of custom functions for accessing
 * data from Pandora, Spotify, & Soundcloud public APIs
 * directly inside Google Sheets
 */

// [REQUIRED] Tokens
var PANDORA_ACCESS_TOKEN = "{PANDORA_ACCESS_TOKEN}";
var SOUNDCLOUD_CLIENT_ID = "{SOUNDCLOUD_CLIENT_ID}";
var SPOTIFY_CLIENT_ID = "{SPOTIFY_CLIENT_ID}";
var SPOTIFY_CLIENT_SECRET = "{SPOTIFY_CLIENT_SECRET}";

// Helpers + Custom functions below. 
// [START Midas]
// Contribute here: https://github.com/samirrayani/midas

/**
 * A wrapper object for shared methods
 * (initialized below)
 */
function Midas() {
  /**
   * Wrapper for UrlFetchApp.fetch()
   * 
   * @param {String} url
   * @param {Object} options JavaScript object specifying advanced parameters 
   * @return {Object} The API Response
   */
  this.fetchUrl = function(url, options) {
    if(!options) {
      options = {};
    }
    Utilities.sleep(Math.random()*1000);
    var response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());  
  };
  
  /**
   * Hello Midas
   */
  this.hello = function() {
    return "Hello Midas";
  }
}
// initialize global MIDAS object
var MIDAS = new Midas();

/**
 * Get's the latest Pandora Trendsetters
 * https://www.nextbigsound.com/charts/trendsetters
 * 
 * @return {Array} [nbs_artist_id, nbs_artist_name]
 * @customfunction
 */
function getPandoraTrendsetters() {
  var url = "https://api.nextbigsound.com/charts/v2/1/releases/latest/appearances?fields=items.artist.id,items.score,items.artist.name&limit=100&offset=0&access_token=" + PANDORA_ACCESS_TOKEN;
  var json = MIDAS.fetchUrl(url); 
  var artists = [];
  artists.push(["NBS Artist ID", "NBS Artist Name"]);
  for(var i=0; i< json.items.length; i++) {
    var item = json.items[i];
    artists.push([item.artist.id, item.artist.name]);
  }
  return artists;
}

/**
 * Get's the latest Pandora Predictions
 * https://www.nextbigsound.com/charts/predictions
 * 
 * @return {Array} [nbs_artist_id, nbs_artist_name]
 * @customfunction
 */
function getPandoraPredictions() {
  var url = "https://api.nextbigsound.com/charts/v2/3/releases/latest/appearances?fields=items.artist.id,items.artist.name&limit=100&offset=0&access_token=" + PANDORA_ACCESS_TOKEN;
  var json = MIDAS.fetchUrl(url); 
  var artists = [];
  artists.push(["NBS Artist ID", "NBS Artist Name"]);
  for(var i=0; i< json.items.length; i++) {
    var item = json.items[i];
    artists.push([item.artist.id, item.artist.name]);
  }
  return artists;
}

/**
 * Get's the number of Pandora monthly active listeners for a given nbs artist id
 * 
 * @param {Number} nbsId The NBS Artist ID
 * @return {Number} The monthly active listener count (total)
 * @customfunction
 */
function getPandoraListenerCount(nbsId) {
  var url = "https://api.nextbigsound.com/artists/v2/"+nbsId+"?fields=pandoraAudience&access_token=" + PANDORA_ACCESS_TOKEN;
  var json = MIDAS.fetchUrl(url);   
  return json.pandoraAudience.monthlyActiveListeners.total;
}

/**
 * Get's the number of Pandora monthly streams for a given nbs artist id
 * 
 * @param {Number} nbsId The NBS Artist ID
 * @return {Number} The monthly stream count (total)
 * @customfunction
 */
function getPandoraStreamsCount(nbsId) {
  var url = "https://api.nextbigsound.com/artists/v2/"+nbsId+"?fields=pandoraAudience&access_token=" + PANDORA_ACCESS_TOKEN;
  var json = MIDAS.fetchUrl(url); 
  return json.pandoraAudience.streams.total;
}

/**
 * Get's the number of Pandora lifetime streams for a given nbs artist id
 * 
 * @param {Number} nbsId The NBS Artist ID
 * @return {Number} The lifetime streams count
 * @customfunction
 */
function getPandoraLifetimeStreams(nbsId) {
  var url = "https://api.nextbigsound.com/meta/v1/artists/"+nbsId+"?fields=totals&access_token=" + PANDORA_ACCESS_TOKEN;
  var json = MIDAS.fetchUrl(url);  
  return json.totals.streams;
}

/**
 * Get's the number of total Pandora artist stations for a given nbs artist id
 * 
 * @param {Number} nbsId The NBS Artist ID
 * @return {Number} The lifetime total artist station count
 * @customfunction
 */
function getPandoraArtistStationAdds(nbsId) {
  var url = "https://api.nextbigsound.com/metrics/v1/entity/"+nbsId+"/category/awareness?metrics=412&access_token=" + PANDORA_ACCESS_TOKEN;
  var json = MIDAS.fetchUrl(url); 
  return json.data[412].summary.LTD;
}

/**
 * Get's the first NBS Artist ID for a given artist name
 *
 * @param {String} name the artist's name
 * @return {Number} a Next Big Sound artist ID
 * @customfunction
 */
function getNBSArtistId(name) {
  var url = "https://api.nextbigsound.com/search/v1/artists/?limit=1&fields=id,name&query=" + name + "&access_token=" + PANDORA_ACCESS_TOKEN;
  var json = MIDAS.fetchUrl(url); 
  return json.artists[0].id;
}

/**
 * Get's the number of Soundcloud followers for a given Soundcloud user
 *
 * @param {String} soundcloudUsername The Soundcloud username we want to fetch data for.
 * @return {Number} The follower count
 * @customfunction
 */
function getSoundcloudFollowerCount(soundcloudUsername) {
  var url = "http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/" + soundcloudUsername + "&client_id=" + SOUNDCLOUD_CLIENT_ID;
  var json = MIDAS.fetchUrl(url);  
  return json.followers_count;
}

/**
 * Get's the first Soundcloud username for a given artist name
 *
 * @param {String} name the artist's name
 * @return {String} a Soundcloud username
 * @customfunction
 */
function getSoundcloudUsername(name) {
  var url = "http://api.soundcloud.com/users?q=" + name + "&limit=1&client_id=" + SOUNDCLOUD_CLIENT_ID;
  var json = MIDAS.fetchUrl(url); 
  return json[0].permalink;
}

/**
 * Get's the number of Spotify followers for a given spotify artist ID
 *
 * @param {String} spotifyArtistId The Spotify Artist ID we want to fetch data for.
 * @return {Number} The follower count
 * @customfunction
 */
function getSpotifyArtistFollowers(spotifyArtistId) {
  var access_token = getSpotifyToken_();
  
  var url = "https://api.spotify.com/v1/artists/" + spotifyArtistId;
  var options = {
    contentType: "application/x-www-form-urlencoded",
    headers: { "Authorization": "Bearer " + access_token },
    muteHttpExceptions: true
  };
  
  var json = MIDAS.fetchUrl(url, options); 
  return json.followers.total;
}

/**
 * Get's the first Spotify artistID for a given artist name
 *
 * @param {String} name the artist's name
 * @return {String} a Spotify Artist ID
 * @customfunction
 */
function getSpotifyArtistId(name) {
  var access_token = getSpotifyToken_();
  
  var url = "https://api.spotify.com/v1/search?type=artist&limit=10&q=" + name;
  var options = {
    contentType: "application/x-www-form-urlencoded",
    headers: { "Authorization": "Bearer " + access_token },
    muteHttpExceptions: true
  };
  
  var json = MIDAS.fetchUrl(url, options); 
  return json.artists.items[0].id;
}

/**
 * Get a Spotify Token from cache
 *
 * @return {String} a Spotify Token
 */
function getSpotifyToken_() {
  //we want to use the cache here so we're not constantly fetching the auth token
  var cache = CacheService.getDocumentCache();
  var cached = cache.get("access_token"+SPOTIFY_CLIENT_ID);
  if (cached != null) {
    return cached;
  }
  
  //else let's go get our Token from the Spotify API
  var url = "https://accounts.spotify.com/api/token";
  var authorization = "Basic " + Utilities.base64Encode(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET);
  var options = {
    method: "post",
    contentType: "application/x-www-form-urlencoded",
    payload: { "grant_type":"client_credentials" },
    headers: { "Authorization": authorization },
    muteHttpExceptions: true
  };
  
  var json = MIDAS.fetchUrl(url, options); 
  cache.put("access_token"+SPOTIFY_CLIENT_ID, json.access_token, 3000); // cache for 50 minutes.
  return authorization;
}

// [END Midas]
// Contribute here: https://github.com/samirrayani/midas
