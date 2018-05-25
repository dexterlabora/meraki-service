/**
 * VLANs
 * @module VLANs
 */
const vlans = {


  /**
   * Return the VLANs for this network
   * @memberof module:VLANs
   * @param {*} netId 
   */
  getVlans(netId) {
    return this.meraki.get('/networks/' + netId + '/vlans').then((res) => res.data);
  },

  /**
   * Return a VLAN
   * @memberof module:VLANs
   * @param {*} netId 
   * @param {*} vlanId 
   */
  getVlan(netId, vlanId) {
    return this.meraki.get('/networks/' + netId + '/vlans/' + vlanId).then((res) => res.data);
  },

  /**
   * Update a VLAN
   * @memberof module:VLANs
   * @param {*} netId 
   * @param {*} vlanId 
   * @param {*} body 
   */
  updateVlan(netId, vlanId, body) {
    return this.meraki.put('/networks/' + netId + '/vlans/' + vlanId, body).then((res) => res.data);
  },

  /**
   * Add a VLAN
   * @memberof module:VLANs
   * @param {*} netId 
   * @param {*} body 
   */
  addVlan(netId, body) {
    return this.meraki.get('/networks/' + netId + '/vlans', body).then((res) => res.data);
  },

  /**
   * Delete a VLAN
   * @memberof module:VLANs
   * @param {*} netId 
   */
  deleteVlan(netId) {
    return this.meraki.delete('/networks/' + netId + '/vlans/' + vlanId).then((res) => res.data);
  }
}

module.exports = vlans;