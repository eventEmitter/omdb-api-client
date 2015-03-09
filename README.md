# omdb-api-client

a simple omdb api client

## installation

    npm i omdb-api-client

## build status

[![Build Status](https://travis-ci.org/eventEmitter/omdb-api-client.png?branch=master)](https://travis-ci.org/eventEmitter/omdb-api-client)

## usage
    
    // import
    var APIClinet = require('omdb-api-client');

    // instantiate
    var omdb = new APIClinet();


You may use all request parameters specified ont he [omdb api page](http://www.omdbapi.com/)

    // list a movie using promises
    omdb({t:'chappie'}).list().then(function(movie) {
        log(movie);
    }).catch(function(err) {
        log(err);
    });


    // list a movie using callbacks
    omdb({i:'tt1823672'}).list(function(err, movie) {
        log(err, movie);
    });