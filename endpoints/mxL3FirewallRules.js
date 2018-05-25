/**
 * MX L3 Firewall Rules
 * @module MX_L3_Firewall
 */
const mxL3FW = {

    /**
     * Return L3 Firewall Rules for an MX
     * @param {*} netId 
     */
    getL3FirewallRulesMX(netId) {
        return this.meraki.get('/networks/' + netId + '/l3FirewallRules/').then((res) => res.data);
    },

    /**
     * Update L3 Firewall Rules for an MX
     * @param {*} netId 
     * @param {*} body 
     */
    updateL3FirewallRulesMX(netId, body) {
        return this.meraki.put('/networks/' + netId + '/l3FirewallRules/', body).then((res) => res.data);
    }
}

module.exports = mxL3FW;