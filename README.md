# Midas

Midas is a suite of custom functions for accessing artist popularity data from Pandora, Spotify, & Soundcloud public APIs directly inside Google Sheets.

## Getting Started

### Analyst Mode

The simplest way to get started is to install the Midas Google Sheet Add-on from the Chrome Web Store [here](https://chrome.google.com/webstore/detail/midas/lidofomciddoicapheahmbnjmoajogjj). If you want to extend Midas into your own existing project, read on.

### Developer Mode

To use the raw source code and create or extend your own project, you'll need to first setup your environment.

- Create a new Google Sheet
- Open Script Editor and paste the contents of [`Midas.gs`](https://github.com/samirrayani/midas/blob/master/Midas.js) into `Code.gs`

- Get API Tokens from Pandora, Spotify, and Soundcloud

### API Tokens

- To get a Pandora Access Token (powered by Next Big Sound), please email support@nextbigsound.com
- To get a Spotify Client ID and Token, create a new client in the [Spotify for Developers dashboard](https://developer.spotify.com/dashboard/applications)
- To get a Soundcloud Client ID, create a new client in the [Soundcloud for Developers dashboard](https://soundcloud.com/you/apps)

Set these token values in `Midas.gs`:

```javascript
// [REQUIRED] Tokens
var PANDORA_ACCESS_TOKEN = "{PANDORA_ACCESS_TOKEN}";
var SOUNDCLOUD_CLIENT_ID = "{SOUNDCLOUD_CLIENT_ID}";
var SPOTIFY_CLIENT_ID = "{SPOTIFY_CLIENT_ID}";
var SPOTIFY_CLIENT_SECRET = "{SPOTIFY_CLIENT_SECRET}";
```

### Docs
After initializing the tokens above, Save the file and return back to your Google Sheet. To verify that the custom functions were correctly, try any of the custom functions below:


|Function|Description|
|--- |--- |
|`=getPandoraTrendsetters()`|Get the latest Pandora Trendsetters Chart and returns a 2d array with `[nbsId, nbs_artist_name]`|
|`=getPandoraPredictions()`|Get the latest Pandora Predictions Chart and returns a 2d array with `[nbsId, nbs_artist_name]`|
|`=getPandoraListenerCount(nbsId)`|Get the number of Pandora monthly active listeners (28 days) for a given nbs artist id|
|`=getPandoraStreamsCount(nbsId)`|Get the number of Pandora monthly streams (28 days) for a given nbs artist id|
|`=getPandoraLifetimeStreams(nbsId)`|Get the number of Pandora lifetime streams for a given nbs artist id|
|`=getPandoraArtistStationAdds(nbsId)`|Get the number of total Pandora artist stations for a given nbs artist id|
|`=getNBSArtistId(name)`|Find the first NBS Artist ID for a given artist name|
|`=getSoundcloudUsername(name)`|Find the first Soundcloud username for a given artist name|
|`=getSoundcloudFollowerCount(soundcloudUsername)`|Get the number of Soundcloud followers for a given Soundcloud username|
|`=getSpotifyArtistId(name)`|Find the first Spotify artistID for a given artist name|
|`=getSpotifyArtistFollowers(spotifyArtistId)`|Get the number of Spotify followers for a given spotify artist ID|
