const mxCellFW = {
      // **************
  // MX Cellular Firewall Rules
  // **************

  // GET Return cellular Firewall Rules
  getCellularFirewallRules(netId, ssidNum) {
    return this.meraki.get('/networks/' + netId + '/cellularFirewallRules/').then((res) => res.data);
  },

  // PUT Update cellular Firewall Rules
  updateCellularFirewallRules(netId, body) {
    return this.meraki.put('/networks/' + netId + '/cellularFirewallRules/', body).then((res) => res.data);
  }
}

module.exports = mxCellFW;