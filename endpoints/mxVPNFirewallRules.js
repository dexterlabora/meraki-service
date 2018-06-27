/**
 * MX VPN Firewall Rules
 * @module MX_VPN_Firewall
 */
const mxVPN = {

    /**
     * Return the firewall rules for an organization's site-to-site VPN
     * @memberof module:MX_VPN_Firewall
     * @param {*} orgId 
     */
    getVpnFirewallRules(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/vpnFirewallRules').then((res) => res.data);
    },

    /**
     * Update firewall rules of an organization's site-to-site VPN
     * @memberof module:MX_VPN_Firewall
     * @param {*} orgId 
     * @param {*} body 
     */
    updateVpnFirewallRules(orgId, body) {
        return this.meraki.put('/organizations/' + orgId + '/vpnFirewallRules', body).then((res) => res.data);
    }
}

module.exports = mxVPN;