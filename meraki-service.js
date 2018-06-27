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
        console.log(e.response.data.errors[0]);
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
    this._data; // stores request data to handle redirects properly

    this.initMeraki();
  }

  // *************
  // Intialize API
  // *************

  /**
   * @private
   */
  initMeraki() {
    this.meraki = axios.create({
      baseURL: this._baseUrl,
      //maxRedirects: 0,
      headers: {
        "X-Cisco-Meraki-API-Key": this._apiKey,
        "Content-Type": "application/json"
      },
      transformResponse: [JSONbig.parse]
    });

    this.meraki.interceptors.request.use(config => {
      //console.log('config', config);
      //console.log('config.body', config.body);
      //console.log('config headers', config.headers)
      //console.log('config request', config.request)
      config.validateStatus = function(status) {
        return status == "308" || "307" || "302" || "301"; // do not throw error for redirects
      };

      this._data = config.body; // cached request to handle redirects
      this._headers = config.headers; // cached request to handle redirects
      return config;
    });

    this.meraki.interceptors.response.use(
      res => {
        const data = this._data;
        const headers = this._headers;
        //console.log('Meraki Service res:', res.request.path, res.status);
        //console.log('Meraki Service response res.request', res.request);

        if (
          (res.status == "308" || "307" || "302" || "301") &&
          res.headers.location
        ) {
          //console.log('REDIRECT')
          var options = {
            url: res.headers.location,
            data: data,
            method: res.request.method,
            headers: headers
          };
          //console.log('options', options);
          return this.meraki(options).then(res => {
            //console.log('redirect res', res);
            return res;
          });
        } else {
          //const data = this._data;
          return res;
        }
      },
      error => {
        return _handleError(error);
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
