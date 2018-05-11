
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
        this._data = config.data; // cached request to handle redirects
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

  // ****************
  // ~~~~~~~~~~~~~~~~
  // API Endpoints
  // ~~~~~~~~~~~~~~~~
  // ****************



  // ********
  // Proxy - Catch all
  // ********

  /* example
  const options = {
    url: '/organizations',
    method: 'get'
  }
  */
  proxy(options) {
    return this.meraki(options).then((res) => res);
  }

  // *********
  // Admins
  // *********

  // GET list the dashboard administrators
  getAdmins(orgId) {
    return this.meraki.get('/organizations/' + orgId + '/admins').then((res) => res);
  }

  // POST create a dashboard administrator
  createAdmin(orgId, body) {
    return this.meraki.post('/organizations/' + orgId + '/admins', body).then((res) => res);
  }

  // PUT update a dashboard administrator
  updateAdmin(orgId, adminId) {
    return this.meraki.put('/organizations/' + orgId + '/admins/' + adminId).then((res) => res);
  }

  // DELETE revoke a dashboard administrator
  deleteAdmin(orgId, adminId) {
    return this.meraki.delete('/organizations/' + orgId + '/admins/' + adminId).then((res) => res);
  }

  // *********
  // Clients
  // *********

  // GET list the cliets for a Meraki device serial for a given timespan in seconds
  getClients(serial, timespan) {
    return this.meraki.get('/devices/' + serial + '/clients?timespan=' + timespan).then((res) => res);
  }

  // GET policy for a Client in a Network
  getClientPolicy(netId, clientMac, timespan) {
    return this.meraki.get('/networks/' + netId + '/clients/' + clientMac + '/policy?timespan=' + timespan).then((res) => res);
  }

  // PUT update the policy for a Client in a Network
  updateClientPolicy(netId, clientMac, timespan, data) {
    return this.meraki.put('/networks/' + netId + '/clients/' + clientMac + '/policy?timespan=' + timespan, data).then((res) => res);
  }

  // GET Return the splash authorization for a client, for each SSID they've associated with through splash.
  getSplashAuth(netId, clientMac) {
    return this.meraki.get('/networks/' + netId + '/clients/' + clientMac + '/splashAuthorizationStatus').then((res) => res);
  }

  // PUT Return the splash authorization for a client, for each SSID they've associated with through splash.
  updateSplashAuth(netId, clientMac, body) {
    return this.meraki.put('/networks/' + netId + '/clients/' + clientMac + '/splashAuthorizationStatus', body).then((res) => res);
  }

  // *********
  // Config Templates
  // *********

  // GET Config templates for an organization
  getConfigTemplates(orgId) {
    return this.meraki.get('/organizations/' + orgId + '/configTemplates').then((res) => res);
  }

  // DELETE a Configuration Template
  removeConfigTemplate(orgId, templateId) {
    return this.meraki.delete('/organizations/' + orgId + '/configTemplates/' + templateId).then((res) => res);
  }

  // POST bind Network to Template
  bindTemplate(netId, data) {
    return this.meraki.post('/networks/' + netId + '/bind', data).then((res) => res);
  }

  // POST unbind Network from Template
  unbindTemplate(netId, data) {
    return this.meraki.post('/networks/' + netId + '/unbind', data).then((res) => res);
  }

  // *********
  // Devices
  // *********

  // GET list devices for a network
  getDevices(netId) {
    return this.meraki.get('/networks/' + netId + '/devices').then((res) => res);
  }

  // GET return a single device in a network
  getDevice(netId, serial) {
    return this.meraki.get('/networks/' + netId + '/devices/' + serial).then((res) => res);
  }

  // GET return performance score for a single device (MX)
  getPerfScore(netId, serial) {
    return this.meraki.get('/networks/' + netId + '/devices/' + serial + '/performance').then((res) => res);
  }

  // PUT update the attributes of a single device
  updateDevice(netId, serial, body) {
    return this.meraki.get('/networks/' + netId + '/devices/' + serial, body).then((res) => res);
  }

  // GET return uplink status for a device
  getUplinkStatus(netId, serial) {
    return this.meraki.get('/networks/' + netId + '/devices/' + serial + '/uplink').then((res) => res);
  }

  // POST claime a device
  claimDevice(netId, body) {
    return this.meraki.post('/networks/' + netId + '/devices/claim', body).then((res) => res);
  }

  // POST remove a device from a network (no post body required)
  removeDevice(netId, serial) {
    return this.meraki.post('/networks/' + netId + '/devices/' + serial + '/remove').then((res) => res);
  }

  // ****************
  // Group Policies
  // ****************

  // GET List Group Policies for a Network
  getPolicies(netId) {
    return this.meraki.get('/networks/' + netId + '/groupPolicies').then((res) => res);
  }

  // **************
  // MR L3 Firewall Rules
  // **************

  // GET list L3 Firewall Rules for an SSID
  getL3FirewallRulesMR(netId, ssidNum) {
    return this.meraki.get('/networks/' + netId + '/ssids/' + ssidNum + '/l3FirewallRules').then((res) => res);
  }

  // PUT update L3 Firewall Rules for an SSID
  updateL3FirewallRulesMR(netId, ssidNum, body) {
    return this.meraki.put('/networks/' + netId + '/ssids/' + ssidNum + '/l3FirewallRules', body).then((res) => res);
  }

  // **************
  // MX VPN Firewall Rules
  // **************

  // GET Return the firewall rules for an organization's site-to-site VPN
  getVpnFirewallRules(orgId) {
    return this.meraki.get('/organizations/' + orgId + '/vpnFirewallRules').then((res) => res);
  }

  // PUT Update firewall rules of an organization's site-to-site VPN
  updateVpnFirewallRules(orgId, body) {
    return this.meraki.put('/organizations/' + orgId + '/vpnFirewallRules', body).then((res) => res);
  }

  // **************
  // MX L3 Firewall Rules
  // **************

  // GET list L3 Firewall Rules for an MX
  getL3FirewallRulesMX(netId) {
    return this.meraki.get('/networks/' + netId + '/l3FirewallRules/').then((res) => res);
  }

  // PUT update L3 Firewall Rules for an MX
  updateL3FirewallRulesMX(netId, body) {
    return this.meraki.put('/networks/' + netId + '/l3FirewallRules/', body).then((res) => res);
  }

  // **************
  // MX Cellular Firewall Rules
  // **************

  // GET Return cellular Firewall Rules
  getCellularFirewallRules(netId, ssidNum) {
    return this.meraki.get('/networks/' + netId + '/cellularFirewallRules/').then((res) => res);
  }

  // PUT Update cellular Firewall Rules
  updateCellularFirewallRules(netId, body) {
    return this.meraki.put('/networks/' + netId + '/cellularFirewallRules/', body).then((res) => res);
  }

  // ****************
  // Networks
  // ****************

  // GET Networks for an organization
  getNetworks(orgId) {
    return this.meraki.get('/organizations/' + orgId + '/networks').then((res) => res);
  }

  // GET Network 
  getNetwork(netId) {
    return this.meraki.get('/networks/' + netId).then((res) => res);
  }

  // PUT Network 
  updateNetwork(netId, body) {
    return this.meraki.put('/networks/' + netId, body).then((res) => res);
  }

  // POST Network in an organization
  createNetwork(orgId, data) {
    return this.meraki.post('/organizations/' + orgId + '/networks', data).then((res) => res);
  }

  // DELETE Network
  deleteNetwork(netId) {
    return this.meraki.delete('/networks/' + netId).then((res) => res);
  }

  // GET Traffic for a network
  getTraffic(netId, timespan) {
    return this.meraki.get('/networks/' + netId + '/traffic?timespan=' + timespan).then((res) => res);
  }

  // GET access policies for a network of switches
  getAccessPolicies(netId) {
    return this.meraki.get('/networks/' + netId + '/accessPolicies').then((res) => res);
  }

  // GET return the bluetooth settings for a network (MR)
  getBluetoothSettings(netId) {
    return this.meraki.get('/networks/' + netId + '/bluetoothSettings').then((res) => res);
  }

  // PUT update the bluetooth settings for a network (MR)
  updateBluetoothSettings(netId) {
    return this.meraki.put('/networks/' + netId + '/bluetoothSettings').then((res) => res);
  }

  // GET List Air Marshal scan results from a network
  getAirmarshal(netId, timespan) {
    return this.meraki.get('/networks/' + netId + '/airMarshal?timespan=' + timespan).then((res) => res);
  }

  // ****************
  // Organizations
  // ****************

  getOrganizations() {
    return this.meraki.get('/organizations', { transformResponse: [data => data] })
      .then(res => {
        try {
          res.data = JSONbig.stringify(res.data);
          return res
        } catch (e) {
          return e;
        }
      });
  }

  // GET single organization
  getOrganization(orgId) {
    return this.meraki.get('/organizations/' + orgId).then((res) => res);
  }

  // PUT update an organization
  updateOrganization(orgId, body) {
    return this.meraki.put('/organizations/' + orgId, body).then((res) => res);
  }

  // POST create an organization
  createOrganization(body) {
    return this.meraki.post('/organizations/', body).then((res) => res);
  }

  // POST create an organization by cloning
  createOrganizationClone(orgId, body) {
    return this.meraki.post('/organizations/' + orgId + '/clone', body).then((res) => res);
  }

  // POST claim order, license key, or order into an organization
  claimOrderLicenseSerial(orgId, body) {
    return this.meraki.post('/organizations/' + orgId + '/claim', body).then((res) => res);
  }

  // GET Licenses for an organization
  getLicenseState(orgId) {
    return this.meraki.get('/organizations/' + orgId + '/licenseState').then((res) => res);
  }

  // GET Inventory for an organization
  getInventory(orgId) {
    return this.meraki.get('/organizations/' + orgId + '/inventory').then((res) => res);
  }

  // GET Devices for an organization and their statuses
  getOrgDevices(orgId) {
    return this.meraki.get('/organizations/' + orgId + '/deviceStatuses').then((res) => res);
  }

  // GET SNMP settings
  getOrgDevices(orgId) {
    return this.meraki.get('/organizations/' + orgId + '/snmp').then((res) => res);
  }

  // PUT SNMP settings
  updateSnmpSettings(orgId, body) {
    return this.meraki.put('/organizations/' + orgId + '/snmp', body).then((res) => res);
  }

  // GET third party VPN peers
  getThirdPartyVpnPeers(orgId) {
    return this.meraki.get('/organizations/' + orgId + '/thirdPartyVPNPeers').then((res) => res);
  }

  // PUT third party VPN peers
  updateThirdPartyVpnPeers(orgId, body) {
    return this.meraki.put('/organizations/' + orgId + '/thirdPartyVPNPeers', body).then((res) => res);
  }

  // *********
  // SAML Roles
  // *********

  // GET List the SAML roles for this organization
  getSamlRoles(orgId) {
    return this.meraki.get('/organizations/' + orgId + '/samlRoles').then((res) => res);
  }

  // GET Return a SAML role
  getSamlRoles(orgId, samlId) {
    return this.meraki.get('/organizations/' + orgId + '/samlRoles/' + samlId).then((res) => res);
  }

  // PUT Update a SAML role
  updateSamlRole(orgId, samlId, body) {
    return this.meraki.put('/organizations/' + orgId + '/samlRoles/' + samlId, body).then((res) => res);
  }

  // POST Create a SAML role
  createSamlRoles(orgId) {
    return this.meraki.post('/organizations/' + orgId + '/samlRoles').then((res) => res);
  }

  // DELET REmove a SAML role
  deleteSamlRole(orgId, samlId) {
    return this.meraki.put('/organizations/' + orgId + '/samlRoles/' + samlId).then((res) => res);
  }

  // *********
  // SSIDs
  // *********

  // GET SSIDs for an organization
  getSsids(netId) {
    return this.meraki.get('/networks/' + netId + '/ssids').then((res) => res);
  }

  // GET SSIDs for an organization
  getSsid(netId, ssidNum) {
    return this.meraki.get('/networks/' + netId + '/ssids/' + ssidNum).then((res) => res);
  }

  // PUT Update SSID
  updateSsid(netId, number, data) {
    return this.meraki.put('/networks/' + netId + '/ssids/' + number, data).then((res) => res);
  }

  // **************
  // Static Routes
  // **************

  // GET List the static routes for this network
  getStaticRoutes(netId) {
    return this.meraki.get('/networks/' + netId + '/staticRoutes').then((res) => res);
  }

  // GET Return a static route
  getStaticRoute(netId, srId) {
    return this.meraki.get('/networks/' + netId + '/staticRoutes/' + srId).then((res) => res);
  }

  // PUT Update SSID
  updateStaticRoute(netId, srId, data) {
    return this.meraki.put('/networks/' + netId + '/staticRoutes/' + srId, data).then((res) => res);
  }

  // POST Add a static route
  addStaticRoute(netId, body) {
    return this.meraki.post('/networks/' + netId + '/staticRoutes', body).then((res) => res);
  }

  // DELETE Delete a static route
  deleteStaticRoute(netId, srId) {
    return this.meraki.delete('/networks/' + netId + '/staticRoutes/' + srId).then((res) => res);
  }

  // **************
  // Switch Ports
  // **************

  // GET List the switch ports for a switch
  getSwitchPorts(serial) {
    return this.meraki.get('devices/' + serial + '/switchPorts').then((res) => res);
  }

  // GET Return a switch port
  getSwitchPort(serial, portNum) {
    return this.meraki.get('devices/' + serial + '/switchPorts' + portNum).then((res) => res);
  }

  // PUT Update a switch port
  updateSwitchPort(serial, portNum, body) {
    return this.meraki.get('devices/' + serial + '/switchPorts' + portNum, body).then((res) => res);
  }

  // **************
  // VLANs
  // **************

  // GET List the VLANs for this network
  getVlans(netId) {
    return this.meraki.get('/networks/' + netId + '/vlans').then((res) => res);
  }

  // GET Return a VLAN
  getVlan(netId, vlanId) {
    return this.meraki.get('/networks/' + netId + '/vlans/' + vlanId).then((res) => res);
  }

  // PUT Update a VLAN
  updateVlan(netId, vlanId, body) {
    return this.meraki.put('/networks/' + netId + '/vlans/' + vlanId, body).then((res) => res);
  }

  // POST Add a VLAN
  addVlan(netId, body) {
    return this.meraki.get('/networks/' + netId + '/vlans', body).then((res) => res);
  }

  // DELETE Delete a VLAN
  deleteVlan(netId) {
    return this.meraki.delete('/networks/' + netId + '/vlans/' + vlanId).then((res) => res);
  }

  // **************
  // Custom Scripts
  // **************

  /*
  These scripts are helfpul for iterating through API endpoints, chaining data or returing enhanced results.
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

  async getClientsForOrg(orgId, timespan) {
    let devices = [] = await this.getOrgDevices(orgId).then((res) => { return res.data }); // doesn't return model type
    //console.log('devices in org', devices);
    let clients = [];
    for (let d of devices) {
      try {
        let c = await this.getClients(d.serial, timespan).then((res) => { return res.data });
        if (c.errors) { continue }
        c.device = d;
        clients.push(c);
      } catch (e) {
        continue;
      }
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
      } else {
        if (!d.model.includes("MR") && !d.model.includes("MX") && !d.model.includes("MS")) { continue }
      }
      try {
        let c = await this.getClients(d.serial, timespan).then((res) => res.data );
        if (c.errors) { continue }
        c.device = d;
        clients.push(c);
      } catch (e) { continue }
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
      try {
        let c = await this.getClientsForNetwork(n.id, timespan, model).then((res) => res.data );
        c.network = n;
        clients.push(c);
      } catch (e) { continue }
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
    let devices = [] = await this.getDevices(netId).then((res) => res.data );
    let clients = [];
    for (let d of devices) {
      if (model) {
        if (!d.model.includes(model)) { continue }
      }
      try {
        let c = await this.getClients(d.serial, timespan).then((res) => { return res.data });
        c.device = d;
        clients.push(c);
      } catch (e) { continue }
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