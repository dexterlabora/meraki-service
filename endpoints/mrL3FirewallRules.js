const mrL3FW = {
    // **************
    // MR L3 Firewall Rules
    // **************

    // GET list L3 Firewall Rules for an SSID
    getL3FirewallRulesMR(netId, ssidNum) {
        return this.meraki.get('/networks/' + netId + '/ssids/' + ssidNum + '/l3FirewallRules').then((res) => res.data);
    },

    // PUT update L3 Firewall Rules for an SSID
    updateL3FirewallRulesMR(netId, ssidNum, body) {
        return this.meraki.put('/networks/' + netId + '/ssids/' + ssidNum + '/l3FirewallRules', body).then((res) => res.data);
    }
}

module.exports = mrL3FW;