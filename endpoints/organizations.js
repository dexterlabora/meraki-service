const JSONbig = require("json-bigint")({ storeAsString: true });

const handleBigInt = data => {
  try {
    return JSON.parse(JSONBigInt.parse(data));
  } catch (err) {
    return data;
  }
};

/**
 * Organizations
 * @module Organizations
 */
const organizations = {
  /**
   * List the Organizations based on the API key
   */
  getOrganizations() {
    return (
      this.meraki
        //.get("/organizations", { transformResponse: [handleBigInt] })
        .get("/organizations")
        .then(res => res.data)
    );
  },

  /**
   * Return a single organization
   * @memberof module:Organizations
   * @param {*} orgId
   */
  getOrganization(orgId) {
    return this.meraki.get("/organizations/" + orgId).then(res => res.data);
  },

  /**
   * Update an organization
   * @memberof module:Organizations
   * @param {*} orgId
   * @param {*} body
   */
  updateOrganization(orgId, body) {
    return this.meraki
      .put("/organizations/" + orgId, body)
      .then(res => res.data);
  },

  /**
   * Create an organization
   * @memberof module:Organizations
   * @param {*} body
   */
  createOrganization(body) {
    return this.meraki.post("/organizations/", body).then(res => res.data);
  },

  /**
   * Create an organization by cloning
   * @memberof module:Organizations
   * @param {*} orgId
   * @param {*} body
   */
  createOrganizationClone(orgId, body) {
    return this.meraki
      .post("/organizations/" + orgId + "/clone", body)
      .then(res => res.data);
  },

  /**
   * Claim order, license key, or order into an organization
   * @memberof module:Organizations
   * @param {*} orgId
   * @param {*} body
   */
  claimOrderLicenseSerial(orgId, body) {
    return this.meraki
      .post("/organizations/" + orgId + "/claim", body)
      .then(res => res.data);
  },

  /**
   * Return licenses for an organization
   * @memberof module:Organizations
   * @param {*} orgId
   */
  getLicenseState(orgId) {
    return this.meraki
      .get("/organizations/" + orgId + "/licenseState")
      .then(res => res.data);
  },

  /**
   * Return inventory for an organization
   * @memberof module:Organizations
   * @param {*} orgId
   */
  getInventory(orgId) {
    return this.meraki
      .get("/organizations/" + orgId + "/inventory")
      .then(res => res.data);
  },

  /**
   * Return devices for an organization and their statuses
   * @memberof module:Organizations
   * @param {*} orgId
   */
  getOrgDevices(orgId) {
    return this.meraki
      .get("/organizations/" + orgId + "/deviceStatuses")
      .then(res => res.data);
  },

  /**
   * Return SNMP settings
   * @memberof module:Organizations
   * @param {*} orgId
   */
  getSnmpSettings(orgId) {
    return this.meraki
      .get("/organizations/" + orgId + "/snmp")
      .then(res => res.data);
  },

  /**
   * Update SNMP settings
   * @memberof module:Organizations
   * @param {*} orgId
   * @param {*} body
   */
  updateSnmpSettings(orgId, body) {
    return this.meraki
      .put("/organizations/" + orgId + "/snmp", body)
      .then(res => res.data);
  },

  /**
   * Return third party VPN peers
   * @memberof module:Organizations
   * @param {*} orgId
   */
  getThirdPartyVpnPeers(orgId) {
    return this.meraki
      .get("/organizations/" + orgId + "/thirdPartyVPNPeers")
      .then(res => res.data);
  },

  /**
   * Return third party VPN peers
   * @memberof module:Organizations
   * @param {*} orgId
   * @param {*} body
   */
  updateThirdPartyVpnPeers(orgId, body) {
    return this.meraki
      .put("/organizations/" + orgId + "/thirdPartyVPNPeers", body)
      .then(res => res.data);
  }
};

module.exports = organizations;
