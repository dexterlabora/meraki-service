
/* Meraki Dashboard API endpoint service
A collection of functions to interact with the Meraki API. 

-- For use with NodeJS

Features: 
* Collection of common Dashboard API calls
* Handles URL redirects
* Handles Meraki error messages
* Custom scripts for common API traversals

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


const axios = require("axios");
const JSONbig = require("json-bigint")({ "storeAsString": true });


// Meraki Error Handler (parses the error message within responses)
function _handleError(e) {
  console.log("error in Meraki API call: ", e);
  if (e.message) { e = e.message }
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


class merakiService {

  constructor(apiKey, baseUrl) {
    this._apiKey = apiKey;
    this._baseUrl = baseUrl;
    this._data; // stores request data to handle redirects properly

    this.initMeraki();
  }

  // *************
  // Intialize API 
  // *************

  initMeraki() {
    this.meraki = axios.create({
      baseURL: this._baseUrl,
      maxRedirects: 0,
      headers: {
        'X-Cisco-Meraki-API-Key': this._apiKey,
        'Content-Type': "application/json"
      }
    });

    this.meraki.interceptors.request.use(
      config => {
        //console.log('config', config);
        config.validateStatus = function (status) {
          return status == '308' || '307' || '302' || '301'; // do not throw error for redirects
        }
        /*
        if(config.headers['x-cisco-meraki-api-key']){
          this._apiKey = config.headers['x-cisco-meraki-api-key'];
          console.log('_apiKey', this._apiKey);
        }
        */
        this._data = config.data;
        return config;
      }
    )

    this.meraki.interceptors.response.use(
      res => {
        const data = this._data;
        // console.log('Meraki Service res:', res.request.path, res.status);

        if ((res.status == '308' || '307' || '302' || '301') && res.headers.location) {
          // console.log('REDIRECT')
          var options = {
            url: res.headers.location,
            data: data,
            method: res.request.method
          };
          //console.log('options', options);
          return this.meraki(options).then((res) => {
            //console.log('redirect res.data', res.data);
            return res
          });
        } else {
          return res;
        }
      },
      error => {
        return _handleError(error);
      }
    );

  }

  // *********
  // Getters & Setters for Global API Options
  // *********


  get apiKey() {
    return this._apiKey;
  }

  set apiKey(apiKey) {
    this._apiKey = apiKey;
    this.initMeraki();
  }

  get baseUrl() {
    return this._baseUrl;
  }

  set baseUrl(baseUrl) {
    this._baseUrl = baseUrl;
    this.initMeraki();
  }

  get loading() {
    return this._loading;
  }
  // ********
  // Proxy - Catch all
  // ********

  /* example
  const options = {
    url: '/organizations',
    method: 'get'
  }
  */
  async proxy(options) {
    return await this.meraki(options)
      .then((res) => { return res });
  }

  // ********
  // Organizations
  // ********

  async getOrganizations() {
    return await this.meraki.get('/organizations', { transformResponse: [data => data] })
      .then(res => {
        try {
          res.data = JSONbig.stringify(res.data);
          return res
        } catch (e) {
          return e;
        }

      });
  }

  // GET Inventory for an organization
  async getInventory(orgId) {
    return await this.meraki.get('/organizations/' + orgId + '/inventory').then((res) => { return res });
  }

  // GET Licenses for an organization
  async getLicenseState(orgId) {
    return await this.meraki.get('/organizations/' + orgId + '/licenseState').then((res) => { return res });
  }


  // ********
  // Networks
  // ********

  // GET Networks for an organization
  async getNetwork(netId) {
    return await this.meraki.get('/networks/' + netId).then((res) => { return res });
  }

  // GET Networks for an organization
  async getNetworks(orgId) {
    return await this.meraki.get('/organizations/' + orgId + '/networks').then((res) => { return res });
  }

  // GET Networks for an organization
  async createNetwork(orgId, data) {
    return await this.meraki.post('/organizations/' + orgId + '/networks', data).then((res) => { return res });
  }

  // GET Networks for an organization
  async deleteNetwork(netId) {
    return await this.meraki.delete('/networks/' + netId).then((res) => { return res });
  }

  // GET SSIDs for an organization
  async getSsids(netId) {
    return await this.meraki.get('/networks/' + netId + '/ssids').then((res) => { return res });
  }

  // GET SSIDs for an organization
  async getSsid(netId, ssidNum) {
    return await this.meraki.get('/networks/' + netId + '/ssids/' + ssidNum).then((res) => { return res });
  }

  // PUT Update SSID
  async updateSsid(netId, number, data) {
    return await this.meraki.put('/networks/' + netId + '/ssids/' + number, data).then((res) => { return res });
  }

  // GET Devices for an organization and their statuses
  async getOrgDevices(orgId) {
    return await this.meraki.get('/organizations/' + orgId + '/deviceStatuses').then((res) => { return res });
  }

  // GET Group Policies for a Network
  async getPolicies(netId) {
    return await this.meraki.get('/networks/' + netId + '/groupPolicies').then((res) => { return res });
  }

  // GET Traffic for a network
  async getTraffic(netId, timespan) {
    return await this.meraki.get('/networks/' + netId + '/traffic?timespan=' + timespan).then((res) => { return res });
  }

  // GET Devices for a network
  async getDevices(netId) {
    return await this.meraki.get('/networks/' + netId + '/devices').then((res) => { return res });
  }

  // GET a single Device in a network
  async getDevice(netId, serial) {
    return await this.meraki.get('/networks/' + netId + '/devices/' + serial).then((res) => { return res });
  }

  // GET Cliets for a Meraki device serial for a given timespan in seconds
  async getClients(serial, timespan) {
    return await this.meraki.get('/devices/' + serial + '/clients?timespan=' + timespan).then((res) => { return res });
  }

  // GET Policies for a Client in a Network
  async getClientPolicy(netId, clientMac, timespan) {
    return await this.meraki.get('/networks/' + netId + '/clients/' + clientMac + '/policy?timespan=' + timespan).then((res) => { return res });
  }

  // PUT Policies for a Client in a Network
  async updateClientPolicy(netId, clientMac, timespan, data) {
    return await this.meraki.put('/networks/' + netId + '/clients/' + clientMac + '/policy?timespan=' + timespan, data).then((res) => { return res });
  }
  // *********
  // Templates
  // *********

  // GET Config templates for an organization
  async getConfigTemplates(orgId) {
    return await this.meraki.get('/organizations/' + orgId + '/configTemplates').then((res) => { return res });
  }

  // DELETE a Configuration Template
  async removeConfigTemplate(orgId, templateId) {
    return await this.meraki.delete('/organizations/' + orgId + '/configTemplates/' + templateId).then((res) => { return res });
  }

  // POST bind Network to Template
  async bindTemplate(netId, data) {
    return await this.meraki.post('/networks/' + netId + '/bind', data).then((res) => { return res });
  }

  // POST unbind Network from Template
  async unbindTemplate(netId, data) {
    return await this.meraki.post('/networks/' + netId + '/unbind', data).then((res) => { return res });
  }

  // **************
  // Custom Scripts
  // **************

  /*
  Many of the API calls will return a single item. For scenarios that require multiple results or inputs, custom functions have been
  written to handle this.
  */


  async getNetworkIdForDeviceMac(orgId, mac) {
    const device = await this.getOrgDevices(orgId).then((res) => {
      const devices = [] = res.data.filter(function (obj) {
        return obj.mac == mac;
      });
      console.log('filtered devices ', devices);
      console.log('filtered network ID ', devices[0].networkId);
      return devices[0];
    });
    let res = {
      status: 200,
      data: device.networkId
    };
    return res;
  }

  async getClientsForOrg(orgId, timespan, model) {
    // where model = "MR" MV MX MS MC or model name "MR33"
    let devices = [] = await this.getOrgDevices(orgId).then((res) => { return res.data });
    console.log('devices in org', devices);
    let clients = [];
    for (let d of devices) {
      if (model) {
        if (!d.model.includes(model)) { continue }
      }
      let c = await this.getClients(d.serial, timespan).then((res) => { return res.data });
      c.device = d;
      clients.push(c);
    }
    let res = {
      status: 200,
      data: clients
    };
    return res;
  }

  async getClientsForDevices(devices, timespan, model) {
    let clients = [];
    for (let d of devices) {
      if (model) {
        if (!d.model.includes(model)) { continue }
      }
      let c = await this.getClients(d.serial, timespan).then((res) => { return res.data });
      c.device = d;
      clients.push(c);
    }
    let res = {
      status: 200,
      data: clients
    };
    return res;
  }

  async getClientsForNetworks(networks, timespan, model) {
    let clients = [];
    for (let n of networks) {
      if (model) {
        if (!d.model.includes(model)) { continue }
      }
      let c = await this.getClientsForNetwork(n.id, timespan, model).then((res) => { return res.data });
      c.network = n;
      clients.push(c);
    }
    let res = {
      status: 200,
      data: clients
    };
    return res;
  }

  // Synchronous script to traverse the Meraki API and display the clients and their policies
  async getClientsForNetwork(netId, timespan, model) {
    // where model = "MR" MV MX MS MC or model name "MR33"
    let devices = [] = await this.getDevices(netId).then((res) => { return res.data });
    let clients = [];
    for (let d of devices) {
      if (model) {
        if (!d.model.includes(model)) { continue }
      }
      let c = await this.getClients(d.serial, timespan).then((res) => { return res.data });
      c.device = d;
      clients.push(c);
    }
    let res = {
      status: 200,
      data: clients
    };
    return res;
  }


  async getClientPolicyForClients(clients, netId, timespan) {
    let allClients = [];
    for (let c of clients) {
      try {
        const policy = await this.getClientPolicy(netId, c.mac, timespan).then((res) => { return res.data });
        //console.log('policy', policy);
        if (!policy.type) { continue }
        //console.log(" - Policy type " + policy.type);
        if (policy.groupPolicyId) {
          // console.log(" - ID: " + policy.groupPolicyId);
        }
        c.policy = policy;
        allClients.push(c);
      } catch (e) {
        console.log('error getting client policy', e);
        continue;
      }
    }
    let res = {
      status: 200,
      data: allClients
    };
    return res;
  }





}

module.exports = merakiService