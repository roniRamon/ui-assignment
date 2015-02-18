/*******************************************************************************
 * fetchFromGithub.js - quick node module to populate allData.js from Github
 *
 * Note: in order for this to work, you'll need Node.js and npm installed.
 * You'll also need to run:
 * $ npm install request
 * $ npm install underscore
 * To get the necessary dependencies. After that, just run
 * $ node fetchFromGithub.js
 * To refresh allData.js
 *
 * This data is pulled from Github's Commits API. See
 * https://developer.github.com/v3/repos/commits for details.
 ******************************************************************************/

var request = require( 'request' );
var us = require( 'underscore' );

/*
Feel free to customize these to fetch from a different repo
*/
var OWNER = 'twbs',
    REPO = 'bootstrap',
    TOKEN = '', // See https://developer.github.com/v3/auth/#basic-authentication
                // for details on personal access tokens
    URL = 'https://api.github.com/repos/' + OWNER + '/' + REPO + '/commits';

// Variables required by this script
var _commitList = [];

/*
Helper functions
*/
function _getFromGithub( requestUrl, callback ) {
  var options = {
    url: requestUrl,
    headers: { 'User-Agent': 'ui-assignment' },
    auth: { 'user': TOKEN, pass: '' }
  };

  request( options, function( err, response, body ) {
    if( err || response.statusCode != 200 ) {
      console.error( 'Could not fetch data from Github, exiting.' );
      console.error( err ? err.stack : body );
      process.exit( 1 );
    }

    callback( JSON.parse( body ) );
  });
}

function _handleListResults( data ) {
  us.each( data, function( element ) {
    _getFromGithub( URL + '/' + element.sha, _addToCommitList );
  });
}

function _addToCommitList( data ) {
  _commitList.push( data );

  /*
  This is brittle, but will work for our purposes
  */
  if( _commitList.length >= 200 ) {
    console.log( _commitList );
  }
}

// Get 200 commits from the API
_getFromGithub( URL + '?per_page=100', _handleListResults );
_getFromGithub( URL + '?page=2&per_page=100', _handleListResults );
