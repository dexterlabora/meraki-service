const vlans = {
    // **************
  // VLANs
  // **************

  // GET List the VLANs for this network
  getVlans(netId) {
    return this.meraki.get('/networks/' + netId + '/vlans').then((res) => res.data);
  },

  // GET Return a VLAN
  getVlan(netId, vlanId) {
    return this.meraki.get('/networks/' + netId + '/vlans/' + vlanId).then((res) => res.data);
  },

  // PUT Update a VLAN
  updateVlan(netId, vlanId, body) {
    return this.meraki.put('/networks/' + netId + '/vlans/' + vlanId, body).then((res) => res.data);
  },

  // POST Add a VLAN
  addVlan(netId, body) {
    return this.meraki.get('/networks/' + netId + '/vlans', body).then((res) => res.data);
  },

  // DELETE Delete a VLAN
  deleteVlan(netId) {
    return this.meraki.delete('/networks/' + netId + '/vlans/' + vlanId).then((res) => res.data);
  }
}

module.exports = vlans;