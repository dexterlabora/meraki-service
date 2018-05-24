const JSONbig = require("json-bigint")({ "storeAsString": true });

const handleBigInt = (data) => {
    try {
      return JSON.parse(JSONBigInt.parse(data));
    } catch (err) {
      return data
    }
  }

const organizations = {
    // ****************
    // Organizations
    // ****************

    getOrganizations() {
        return this.meraki.get('/organizations', { transformResponse: [handleBigInt] }).then((res) => res.data);
    },

    // GET single organization
    getOrganization(orgId) {
        return this.meraki.get('/organizations/' + orgId).then((res) => res.data);
    },

    // PUT update an organization
    updateOrganization(orgId, body) {
        return this.meraki.put('/organizations/' + orgId, body).then((res) => res.data);
    },

    // POST create an organization
    createOrganization(body) {
        return this.meraki.post('/organizations/', body).then((res) => res.data);
    },

    // POST create an organization by cloning
    createOrganizationClone(orgId, body) {
        return this.meraki.post('/organizations/' + orgId + '/clone', body).then((res) => res.data);
    },

    // POST claim order, license key, or order into an organization
    claimOrderLicenseSerial(orgId, body) {
        return this.meraki.post('/organizations/' + orgId + '/claim', body).then((res) => res.data);
    },

    // GET Licenses for an organization
    getLicenseState(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/licenseState').then((res) => res.data);
    },

    // GET Inventory for an organization
    getInventory(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/inventory').then((res) => res.data);
    },

    // GET Devices for an organization and their statuses
    getOrgDevices(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/deviceStatuses').then((res) => res.data);
    },

    // GET SNMP settings
    getSnmpSettings(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/snmp').then((res) => res.data);
    },

    // PUT SNMP settings
    updateSnmpSettings(orgId, body) {
        return this.meraki.put('/organizations/' + orgId + '/snmp', body).then((res) => res.data);
    },

    // GET third party VPN peers
    getThirdPartyVpnPeers(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/thirdPartyVPNPeers').then((res) => res.data);
    },

    // PUT third party VPN peers
    updateThirdPartyVpnPeers(orgId, body) {
        return this.meraki.put('/organizations/' + orgId + '/thirdPartyVPNPeers', body).then((res) => res.data);
    }

}

module.exports = organizations;