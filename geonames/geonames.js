'use strict';
/*global require, session */

var console = require ('console');
var urlopen = require ('urlopen');
var serviceVariables = require('service-metadata');
var url = require('url');
var querystring = require ('querystring');

var geonames = (function () {

  function getGeonamesURL(latitude, longitude, username) {
    var geonamesurl = 'http://api.geonames.org/findNearbyJSON';

    if (username === undefined) username = 'demo';

    geonamesurl += '?username=' + username;
    geonamesurl += '&lat=' + latitude;
    geonamesurl += '&lng=' + longitude;
    geonamesurl += '&style=FULL';

    return geonamesurl;
  }

  function doUrlOpen(options, callback) {
    console.alert('geonames.doUrlOpen URL: ' + options.target);
    urlopen.open (options, function (error, response) {
      if (error) {
         console.alert('geonames.doUrlOpen error: ' + JSON.stringify(error));
         session.output.write(JSON.stringify('geonames.doUrlOpen error: ' + error));
      } else {
         var responseStatusCode = response.statusCode;
         if (responseStatusCode === 200) {
            response.readAsJSON(function(error, jsonResponse) {
              if (error) {
                 response.readAsBuffer(function(error, responseData) {
                   if (error) {
                      console.alert('geonames.doUrlOpen response readAsJSON error, readAsBuffer error: ' + error.toString() + ', response data: ' + responseData);
                      session.output.write(JSON.stringify('geonames.doUrlOpen response readAsJSON error, readAsBuffer error: ' + error.toString() + ', response data: ' + responseData));
                   } else {
                      console.alert('geonames.doUrlOpen response readAsJSON error, readAsBuffer: ' + responseData);
                      session.output.write(JSON.stringify('geonames.doUrlOpen response readAsJSON error, readAsBuffer: ' + responseData));
                   }
                 });
                 console.alert('geonames.doUrlOpen response readAsJSON error: ' + error.toString() + ', response data: ' + response);
                 session.output.write(JSON.stringify('geonames.doUrlOpen response readAsJSON error: ' + error.toString() + ', response data: ' + response));
              } else {
                 callback(jsonResponse);
              }
            });
          } else {
              session.output.write (JSON.stringify('geonames.doUrlOpen urlopen return statusCode ' + responseStatusCode));
              response.readAsBuffer(function(error, responseData) {
                if (error) {
                   console.alert('geonames.doUrlOpen response readAsBuffer error: ' + error.toString() + ', response data: ' + response);
                   session.output.write(JSON.stringify('geonames.doUrlOpen response readAsBuffer error: ' + error.toString() + ', response data: ' + response));
                } else {
                   var reasonPhrase = response.reasonPhrase;
                   var errorResponseMessage = 'geonames.doUrlOpen urlopen response: HTTP response code: ' + 
                     responseStatusCode + ', reason: ' + reasonPhrase + ', Message: ' + responseData;
                   console.alert(errorResponseMessage);
                   session.output.write(JSON.stringify(errorResponseMessage));
                }
              });
          }
      }
    });
  }

  return {
    geonamesReverseLookup : function(geonamesInput) {
      var geonamesURL = getGeonamesURL(geonamesInput.latitude, geonamesInput.longitude, geonamesInput.username);

      var options = {
        target : geonamesURL,
        method : 'GET',
        headers : {Accept: 'application/json'},
        contentType : 'application/json'
      };

      doUrlOpen(options, function(result) {
        console.alert(JSON.stringify(result));
        session.output.write(JSON.stringify(result));
      });
    }
  };
})();

var method = serviceVariables.protocolMethod;

if (method === 'GET') {
  var urlIn = url.parse(serviceVariables.URLIn);
  var queryParams = querystring.parse(urlIn.query);
  console.alert('geonames.js: input queryParams: ' + JSON.stringify(queryParams));
  geonames.geonamesReverseLookup(queryParams);
} else if (method === 'POST') {
  session.input.readAsJSON(function(error, jsonInput) {
    if (error) {
       console.alert('geonames.js: input readAsJSON error: ' + error.toString());
       session.output.write(JSON.stringify('geonames.js: input readAsJSON error: ' + error.toString()));
    } else {
       console.alert('geonames.js: input readAsJSON: ' + JSON.stringify(jsonInput));
       geonames.geonamesReverseLookup(jsonInput);
    }
  });
} else
  session.output.write(JSON.stringify('geonames.js:  Invalid HTTP method (must be one of GET or POST): ' + method));