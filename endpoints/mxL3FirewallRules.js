const mxL3FW = {
    // **************
    // MX L3 Firewall Rules
    // **************

    // GET list L3 Firewall Rules for an MX
    getL3FirewallRulesMX(netId) {
        return this.meraki.get('/networks/' + netId + '/l3FirewallRules/').then((res) => res.data);
    },

    // PUT update L3 Firewall Rules for an MX
    updateL3FirewallRulesMX(netId, body) {
        return this.meraki.put('/networks/' + netId + '/l3FirewallRules/', body).then((res) => res.data);
    }
}

module.exports = mxL3FW;