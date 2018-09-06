const JSONbig = require("json-bigint")({ storeAsString: true });

const handleBigInt = data => {
  try {
    return JSONBigInt.parse(data);
  } catch (err) {
    return data;
  }
};

// ********
// Proxy - Catch all
// ********

/**
 * @module Proxy
 *
 */
/* example
  const options = {
    url: '/organizations',
    method: 'get'
  }
  */
/**
 * proxies any meraki API endpoint through this service. Supports user supplied API key header to override the instance defaults.
 *
 *
 *
 * @memberof module:Proxy
 * @param {*} options
 * @example
 *
 * const API_KEY = '123456789012345678901234567890';
 * const API_KEY2 = '098765432109876543210987654321';
 * const meraki = new MerakiService(API_KEY );
 *
 * const proxyOptions = {
 *     url: '/organizations',
 *     method: 'get',
 *     headers: {
 *         "X-Cisco-Meraki-API-Key":API_KEY2
 *     }
 * };
 *
 * meraki.proxy(proxyOptions).then(res => {
 *     console.log('Organizations proxied with custom API key header: ', res.data);
 * });
 */
const proxy = {
  proxy(options) {
    require("axios-debug-log");
    return this.meraki(options).then(res => res);
    /*
    return this.meraki(options, { transformResponse: [handleBigInt] }).then(
      res => res.data
    );
    */
  }
};

module.exports = proxy;
