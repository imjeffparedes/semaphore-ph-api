"use strict";

const request = require("request")
    , querystring = require("querystring")
    ;

module.exports = class SemaphoreSMS {
    /**
     * SemaphoreSMS
     * Creates the instance of the `SemaphoreSMS` class.
     *
     * @name SemaphoreSMS
     * @function
     * @param {Object} options An object containing:
     *
     *  - `apiKey` (String): Semaphore API Key (mandatory).
     *  - `version` (String): Semaphore api version appended to host. (default: `api/v4`).
     *  - `host` (String): Semaphore api host (default: `https://api.semaphore.co/`).
     */
    constructor (options) {
        this.options = options;
        this.apiKey = options.apiKey;
        this.version = options.version || 'api/v4';
        this.host = options.host || "https://api.semaphore.co/";
    }

    /**
     * sendMessage
     * Send a message to single destination.
     *
     * @name sendMessage
     * @function
     * @param {Object} data The Sending Messages parameters (documented [here](https://semaphore.co/docs)).
     * @param {Function} cb The callback function.
     */
    sendMessage (data, cb) {
        return this._request({
            url: "messages"
          , method: "POST"
          , data: data
        }, cb);
    }

    /**
     * sendPriorityMessage
     * Send a priority message to single destination.
     *
     * @name sendPriorityMessage
     * @function
     * @param {Object} data The Sending Messages parameters (documented [here](https://semaphore.co/docs)).
     * @param {Function} cb The callback function.
     */
    sendMessage (data, cb) {
        return this._request({
            url: "priority"
          , method: "POST"
          , data: data
        }, cb);
    }


    /**
     * retrieveMessage
     * To retrieve outgoing SMS messages.
     *
     * @name retrieveMessage
     * @function
     * @param {Object} params The Retrieving Messages parameters (documented [here](https://semaphore.co/docs)).
     * @param {Function} cb The callback function.
     */
    retrieveMessage (params, cb) {
        return this._request({
            url: "messages"
          , method: "GET"
          , params: params
        }, cb);
    }

    /**
     * retrieveMessageById
     * Retrieve a single outgoing SMS message by its unique id
     *
     * @name retrieveMessageById
     * @function
     * @param {Integer} id ID of the message to get.
     * @param {Function} cb The callback function.
     */
    retrieveMessageById (id, cb) {
        return this._request({
            url: `messages/${id}`
          , method: "GET"
        }, cb);
    }


    /**
     * retrieveAccount
     * To retrieve basic information about your account.
     *
     * @name retrieveAccount
     * @function
     * @param {Function} cb The callback function.
     */
    retrieveAccount (cb) {
        return this._request({
            url: "account"
          , method: "GET"
        }, cb);
    }


    /**
     * retrieveAccountTransactions
     * To retrieve transaction information about your account.
     *
     * @name retrieveAccountTransactions
     * @function
     * @param {Object} params The Limit and Page parameters (documented [here](https://semaphore.co/docs)).
     * @param {Function} cb The callback function.
     */
    retrieveAccountTransactions (params, cb) {
        return this._request({
            url: "account/transactions"
          , method: "GET"
          , params: params
        }, cb);
    }


    /**
     * retrieveSenderNames
     * To retrieve sender names associated with your account.
     *
     * @name retrieveSenderNames
     * @function
     * @param {Object} params The Limit and Page parameters (documented [here](https://semaphore.co/docs)).
     * @param {Function} cb The callback function.
     */
    retrieveSenderNames (params, cb) {
        return this._request({
            url: "account/sendernames"
          , method: "GET"
          , params: params
        }, cb);
    }



    /**
     * retrieveUsers
     * To retrieve users associated with your account
     *
     * @name retrieveUsers
     * @function
     * @param {Object} params The Limit and Page parameters (documented [here](https://semaphore.co/docs)).
     * @param {Function} cb The callback function.
     */
    retrieveUsers (params, cb) {
        return this._request({
            url: "account/users"
          , method: "GET"
          , params: params
        }, cb);
    }




    /**
     * _request
     * Low level function for making requests to the API endpoints.
     *
     * @name _request
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `url` (String): The api endpoint.
     *  - `method` (String): The request method (default: `get`).
     *  - `params` (Object): The params object.
     *  - `data` (Object): The POST data object.
     *  - `version` (String): API Version. If not specified your pinned verison is used.
     *
     * @param {Function} cb The callback function.
     */
    _request (options, cb) {

        if(options.data)
          Object.assign(options.data,{
            apikey: this.apiKey
          })
        if(options.params)
          Object.assign(options.params,{
            apikey: this.apiKey
          })

        let _url = options.url
          , method = options.method || "get"
          , params = options.params || {}
          , data = options.data
          , version = options.version || this.version || "api/v4"
          , qs = querystring.stringify(params)
          , removeTrailingSlash = options.removeTrailingSlash || false
          , url = this.host + version + "/"  + _url + (removeTrailingSlash ? "" : "/") + (qs ? "?" + qs : "")
          ;

        return request({
            url: url
          , method: method
          , headers: {
             'Content-Type': 'application/json'
            }
          , json: data ? data : true
        }, (err, res) => {
            if (res.body && res.body.error) {
                err = new Error(res.body.error.message);
            }
            if (err) { return cb(err, null, res); }
            cb(null, res.body, res);
        })
    }
};