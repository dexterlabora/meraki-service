/**
 * MR L3 Firewall Rules
 * @module MR_L3_Firewall
 */
const mrL3FW = {

    /**
     * Return L3 Firewall Rules for an SSID
     * @memberof module:MR_L3_Firewall
     * @param {*} netId 
     * @param {*} ssidNum 
     */
    getL3FirewallRulesMR(netId, ssidNum) {
        return this.meraki.get('/networks/' + netId + '/ssids/' + ssidNum + '/l3FirewallRules').then((res) => res.data);
    },

    /**
     * Update L3 Firewall Rules for an SSID
     * @memberof module:MR_L3_Firewall
     * @param {*} netId 
     * @param {*} ssidNum 
     * @param {*} body 
     */
    updateL3FirewallRulesMR(netId, ssidNum, body) {
        return this.meraki.put('/networks/' + netId + '/ssids/' + ssidNum + '/l3FirewallRules', body).then((res) => res.data);
    }
}

module.exports = mrL3FW;