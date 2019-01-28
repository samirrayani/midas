# Midas

Midas is a suite of custom functions for accessing artist popularity data from Pandora, Spotify, & Soundcloud public APIs directly inside Google Sheets.

[![alt text](https://duaw26jehqd4r.cloudfront.net/items/1O41121G0c0z3J20040W/Screen%20Shot%202019-01-28%20at%201.40.38%20PM.png)](https://vimeo.com/313719964/69a8872881 "Midas Example")

## Getting Started

### Analyst mode

[COMING SOON] The simplest way to get started is to install the Midas Google Sheet Add-on from the Chrome Web Store. If you want to extend Midas into your own existing project, read on.

### Developer mode

To use the raw source code and create or extend your own project, you'll need to first setup your environment.

- Create a new Google Sheet
- Open Script Editor
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


### TODO

- [ ] Finish website copy
- [ ] Publish add-on to chrome store
- [ ] Document deploy/publish process
