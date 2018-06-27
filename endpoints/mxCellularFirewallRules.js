/**
 * MX Cellular Firewall
 * @module MX_Cell_Firewall
 */
const mxCellFW = {

  /**
   * Return cellular Firewall Rules
   * @memberof module:MX_Cell_Firewall
   * @param {*} netId 
   * @param {*} ssidNum 
   */
  getCellularFirewallRules(netId, ssidNum) {
    return this.meraki.get('/networks/' + netId + '/cellularFirewallRules/').then((res) => res.data);
  },

  /**
   * Update cellular Firewall Rules
   * @memberof module:MX_Cell_Firewall
   * @param {*} netId 
   * @param {*} body 
   */
  updateCellularFirewallRules(netId, body) {
    return this.meraki.put('/networks/' + netId + '/cellularFirewallRules/', body).then((res) => res.data);
  }
}

module.exports = mxCellFW;