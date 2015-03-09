!function() {

    var   Class              = require('ee-class')
        , log                = require('ee-log')
        , type               = require('ee-types')
        , RestfulAPI         = require('restful-api-client')
        , APISpecfication    = require('../definition/definition');





    module.exports = new Class({
        inherits: RestfulAPI

        , init: function init(APIKey) {
            this.apiKey = APIKey;

            // automatically build the api
            return init.super.call(this, APISpecfication);
        }


        /**
         * add my auth token to each of the requests
         */
        , prepareRequest: function(request) {
            if (!request.query) request.query = {};

            request.query.v = 1;
            request.query.r = 'json';

            if (this.apiKey) request.apikey = this.apiKey;

            if (request.query.callback) delete request.query.callback;
        }


        /**
         * add the content type to the response since
         * the omdb api is extremly not restful!
         */
        , prepareResponse: function(response) {
            if (response && response.headers) {
                response.headers['content-type'] = 'application/json';
            }
        }



        /**
         * yeah, clean up the messy content!
         */
        , prepareResponseContent: function(data) {
            if (data && type.object(data) && data !== null) {
                Object.keys(data).forEach(function(propertyName) {
                    var newName = propertyName[0].toLowerCase()+propertyName.slice(1);
                    // i like lowercase stuff
                    data[newName] = data[propertyName];
                    delete data[propertyName];

                    if (data[newName] === 'N/A') data[newName] = null;
                    else if (newName === 'genre') data.genres = data.genre.split(/,\s?/gi);
                }.bind(this));
            }
            
            return data;
        }
    });
}();
