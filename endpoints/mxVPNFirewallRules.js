const mxVPN = {
    // **************
    // MX VPN Firewall Rules
    // **************

    // GET Return the firewall rules for an organization's site-to-site VPN
    getVpnFirewallRules(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/vpnFirewallRules').then((res) => res.data);
    },

    // PUT Update firewall rules of an organization's site-to-site VPN
    updateVpnFirewallRules(orgId, body) {
        return this.meraki.put('/organizations/' + orgId + '/vpnFirewallRules', body).then((res) => res.data);
    }
}

module.exports = mxVPN;