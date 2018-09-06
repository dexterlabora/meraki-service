/**


---

It is easy to duplicate any of the methods to and modify them for new API endpoints.

The service requires a few dependencies, which must be installed. 
Install:
npm install axios json-bigint --save

// index.js
const Meraki = require('meraki-service');
const meraki = new Meraki('YourAPIKey','https://api.meraki.com/api/v0');

meraki.getOrganizations().then(res => {
    console.log('Organizations: ', res.data);
});

$ Organizations:  [ { id: 549236, name: 'Meraki DevNet Sandbox' } ]

*/

//const admins = require('./endpoints/admins');

const axios = require("axios");
const JSONbig = require("json-bigint")({ storeAsString: true });
/*
var globalLog = require("global-request-logger");
globalLog.initialize();

globalLog.on("success", function(request, response) {
  console.log("SUCCESS");
  console.log("Request", request);
  console.log("Response", response);
});

globalLog.on("error", function(request, response) {
  console.log("ERROR");
  console.log("Request", request);
  console.log("Response", response);
});
*/

// Meraki Error Handler (parses the error message within responses)
function _handleError(e) {
  console.log("error in Meraki API call: ", e);

  if (e.message) {
    e = e.message;
  }
  if (e.response) {
    if (e.response.data) {
      // Meraki specific error message
      if (e.response.data.errors) {
        console.log("e.response.data.errors", e.response.data.errors[0]);
        e = e.response.data.errors[0];
      }
    } else {
      //console.log(e.response)
      e = e.response;
    }
  } else {
    console.log(e);
  }
  return e;
}
/**
 * # Meraki Service for the Cisco Meraki Dashboard API
 * 
 * A collection of functions and helpers to interact with the API. 

 * -- For use with NodeJS or frontend JavaScript applications.

 * Features: 
 * Collection of common Dashboard API calls
 * Handles URL redirects
 * Handles Meraki error messages
 * Custom scripts for common API traversals
 * 
 * @class
 * @module Meraki
 */

class merakiService {
  /**
   * Initialize a Meraki API Service
   * @constructor
   * @param {string} apiKey - The Meraki API key
   * @param {string} baseUrl - The base Meraki API URL. Uses default:`https://api.meraki.com/api/v0`
   * @returns {}
   */
  constructor(apiKey, baseUrl) {
    this._apiKey = process.env.API_KEY || apiKey;
    this._baseUrl =
      process.env.BASE_URL || baseUrl || "https://api.meraki.com/api/v0";

    this.initMeraki();
  }

  // *************
  // Intialize API
  // *************

  /**
   * @private
   */
  initMeraki() {
    //require("axios-debug-log");
    const debugHttp = require("debug-http");
    debugHttp();
    this.meraki = axios.create({
      baseURL: this._baseUrl,
      //maxRedirects: 0,
      /*
      validateStatus: function(status) {
        return status >= 200 && status <= 302;
      },
      */
      headers: {
        "X-Cisco-Meraki-API-Key": this._apiKey,
        "Content-Type": "application/json"
      },
      transformResponse: [JSONbig.parse]
    });

    this.meraki.interceptors.request.use(config => {
      //console.log("Interceptor request");
      if (!config.method) {
        return config;
      }

      // force non GET requests to error on purpose, this allows for the redirect handler to reconstruct the request with new target URL
      if (config.method.toLowerCase() != "get") {
        config.validateStatus = function(status) {
          return status == 201; // Reject only if the status code 201
        };
      }
      return config;
    });

    this.meraki.interceptors.response.use(
      res => {
        //console.log("Interceptor response");
        return res;
      },
      error => {
        //console.log("Interceptor error");
        //console.log("err error.response.status", error.response.status);
        //console.log("err error.response.headers", error.response.headers);
        //console.log("err error.response.request.res.responseUrl", error.response.request.res.responseUrl);
        //console.log("err error.config", error.config);
        //console.log("err error.config.data", error.config.data);
        //console.log("err error.config.method", error.config.method);
        //console.log("error.response", error.response);
        //console.log("error.config", error.config);
        if (!error.response) {
          return _handleError(error);
        }
        if (!error.config) {
          return _handleError(error);
        }
        // check if using default "get" which is no method defined.
        if (!error.response.request.method) {
          if (error.response.status === 200) return error.response;
        }

        // Check if original request method is different, client was redirected
        if (
          error.response.request.method.toLowerCase() !=
          error.config.method.toLowerCase()
        ) {
          console.log("REDIRECT - handling in meraki-service error");
          // Recreate request using new responseUrl
          //var options = error.config;

          var options = {};
          options.method = error.config.method || "get";
          options.headers = error.config.headers;
          options.data = error.config.data;
          options.baseURL = "";
          options.url = error.response.request.res.responseUrl; // SET NEW LOCATION
          //console.log("redirect options", options);
          return this.meraki(options).then(res => {
            //console.log('redirect res', res);
            return res;
          });
        } else if (error.response.status === 200) {
          console.log("redirect status", error.response.status);
          console.log("response.data", error.response.data); // works
          //console.log("response.data", error.response.request.res.data);
          let response = {};
          //response.status = error.response.status;
          //response.headers = error.response.headers;
          //response.data = error.response.data;
          response = error.response;
          return response;
        } else {
          return _handleError(error);
        }
      }
    );
  }

  /**
   * Getters & Setters for Global API Options
   * @module Meraki/Settings
   */

  /* disabled. is this a security concern?
  get apiKey() {
    return this._apiKey;
  }
  */
  /**
  * set API key
  * @name set:apiKey
  * @memberof module:Meraki/Settings
  * @param {string} apiKey
  * @example <caption>Example Assignment</caption>
  const NEW_KEY = '2f301bccd61b6c642d250cd3f76e5eb66ebd170f';
  meraki.apiKey = NEW_KEY;

  meraki.getOrganizations().then(res => {
      console.log('Organizations: ', res.data);
  });
  * @example <caption>Example Response</caption>
  * Organizations:  [{"id":549236,"name":"Meraki DevNet Sandbox"}]
  */
  set apiKey(apiKey) {
    this._apiKey = apiKey;
    this.initMeraki();
  }

  /**
   * get current API base URL
   * @name get:baseUrl
   * @memberof module:Meraki/Settings
   * @return {string} - Meraki API FQDN `https://api.meraki.com/api/v0`
   * @example <caption>Example Request</caption>
    const meraki = new Meraki(API_KEY);
    var url = meraki.baseUrl;
    console.log('API Base URL: ', url);
    @example <caption>Example Response</caption>
    API Base URL:  https://api.meraki.com/api/v0
   */

  get baseUrl() {
    return this._baseUrl;
  }

  /**
   * set API base URL
   * @name set:baseUrl
   * @memberof module:Meraki/Settings
   * @param {string} baseUrl - Meraki API FQDN `https://api.meraki.com/api/v0` or `https://myProxyServer/api`
   * @example <caption>Example Assignment</caption>
   * 
    const NEW_KEY = '2f301bccd61b6c642d250cd3f76e5eb66ebd170f';
    meraki.apiKey = NEW_KEY;

    meraki.getOrganizations().then(res => {
      console.log('Organizations: ', res.data);
    });
   * @example <caption>Example Response</caption> 
   * Organizations:  [{"id":549236,"name":"Meraki DevNet Sandbox"}]
   * 
   */
  set baseUrl(baseUrl) {
    this._baseUrl = baseUrl;
    this.initMeraki();
  }
}

// ****************
// ~~~~~~~~~~~~~~~~
// API Endpoints
// ~~~~~~~~~~~~~~~~
// ****************
Object.assign(merakiService.prototype, require("./endpoints/admins"));
Object.assign(merakiService.prototype, require("./endpoints/clients"));
Object.assign(merakiService.prototype, require("./endpoints/configTemplates"));
Object.assign(merakiService.prototype, require("./endpoints/devices"));
Object.assign(merakiService.prototype, require("./endpoints/groupPolicies"));
Object.assign(
  merakiService.prototype,
  require("./endpoints/mxCellularFirewallRules")
);
Object.assign(
  merakiService.prototype,
  require("./endpoints/mxL3FirewallRules")
);
Object.assign(
  merakiService.prototype,
  require("./endpoints/mxVPNFirewallRules")
);
Object.assign(
  merakiService.prototype,
  require("./endpoints/mrL3FirewallRules")
);
Object.assign(merakiService.prototype, require("./endpoints/networks"));
Object.assign(merakiService.prototype, require("./endpoints/organizations"));
Object.assign(merakiService.prototype, require("./endpoints/pii"));
Object.assign(merakiService.prototype, require("./endpoints/proxy"));
Object.assign(merakiService.prototype, require("./endpoints/saml"));
Object.assign(merakiService.prototype, require("./endpoints/ssids"));
Object.assign(merakiService.prototype, require("./endpoints/staticRoutes"));
Object.assign(merakiService.prototype, require("./endpoints/switchPorts"));
Object.assign(merakiService.prototype, require("./endpoints/vlans"));

// Custom API Scripts
Object.assign(merakiService.prototype, require("./endpoints/custom"));

module.exports = merakiService;
