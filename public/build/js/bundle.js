(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function addHeaders(request, options) {
    var headers = options.headers || {};
    for (var header in headers) {
        request.setRequestHeader(header, headers[header]);
    }
}

function createRequest(url, options) {
    var request = new XMLHttpRequest();
    var method = options.method || 'GET';
    request.open(method, url);
    request.withCredentials = options.withCredentials || false;
    addHeaders(request, options);
    return request;
}

function addHandlers(request, resolve, reject) {
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            resolve(request.responseText);
        } else {
            var error = Error(request.statusText || 'Unknown failure; possibly CORS');
            error.status = request.status;
            reject(error);
        }
    };
    request.onerror = function (e) {
        reject(e);
    };
}

function encodeQuery(data) {
    var urlData = [];

    var _loop = function _loop(key) {
        var value = Array.isArray(data[key]) ? data[key] : [data[key]];
        value.forEach(function (v) {
            urlData.push(encodeURIComponent(key) + '=' + encodeURIComponent(v));
        });
    };

    for (var key in data) {
        _loop(key);
    }
    return urlData.join('&');
}

function load(url, options) {
    var request = createRequest(url, options);

    var promise = new Promise(function (resolve, reject) {
        addHandlers(request, resolve, reject);
        request.send(options.data);
    });

    function headers(executor) {
        return new Promise(function (resolve, reject) {
            executor = executor || resolve;
            request.onreadystatechange = function () {
                if (this.readyState == this.HEADERS_RECEIVED) {
                    executor(request.getAllResponseHeaders());
                }
            };
            promise.then(resolve);
            promise.catch(reject);
        });
    }

    function json(executor) {
        return new Promise(function (resolve, reject) {
            promise.then(JSON.parse).then(executor || resolve).catch(reject);
        });
    }

    promise.json = json;
    promise.headers = headers;

    return promise;
}

/**
 * XMLHttpRequest to Promise wrapper, with JSON functionality built in.
 */
var ajaxPromises = {

    /**
     * @property {String} version current version of ajaxPromises
     */
    version: '1.0.2',

    /**
     * URL encode data for use as query string.
     */
    encodeQuery: encodeQuery,

    /**
     * GET url with options.
     */
    get: function get(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        options.method = 'GET';
        options.data = null;
        return load(url, options);
    },


    /**
     * POST data to url (with options) as an URL-encoded form. This usually works anywhere, with anything.
     */
    post: function post(url, data) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        options.method = 'POST';
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        options.data = encodeQuery(data);
        return load(url, options);
    },


    /**
     * POST raw JSON to url (with options).
     */
    postJson: function postJson(url, data) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        options.method = 'POST';
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json; charset=UTF-8';
        options.data = JSON.stringify(data);
        return load(url, options);
    },


    /**
     * HEAD url with options.
     *
     * @returns {Object} the headers returned from the URL.
     */
    head: function head(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        options.method = 'HEAD';
        options.data = null;
        return load(url, options).headers();
    }
};

module.exports = ajaxPromises;

},{}],2:[function(require,module,exports){
var ajaxPromises = require('ajax-promises');

console.log('promises', ajaxPromises);
},{"ajax-promises":1}]},{},[2]);
