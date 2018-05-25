

/**
 * Clients
 * @module Clients
 */
const clients = {

    /**
     * list the cliets for a Meraki device serial for a given timespan in seconds
     * @memberof module:Clients
     * @param {*} serial 
     * @param {*} timespan 
     * @return { Promise } A promise holding the clients for this device serial
     * @example <caption>Example request</caption>
     * 
     * meraki.getClients(serial, 86400).then((res) => {
     * console.log(res.data);
     * });
     * 
     * @example <caption>Example response</caption>
     * 
    [ { usage: { sent: 34169.925098183834, recv: 307158.1854811088 },
    id: 'k6c0941',
    description: 'Miles-MacBook-Pro-2',
    mdnsName: 'Miles-MacBook-Pro-2.local',
    dhcpHostname: null,
    mac: 'e0:55:3d:6c:ff:ff',
    ip: '192.168.0.1',
    vlan: 1,
    switchport: '1' },
  { usage: { sent: 0, recv: 112.21213665513233 },
    id: 'k6e9ac3',
    description: 'Android',
    mdnsName: 'Android.local',
    dhcpHostname: 'android-a73b2c8781caa2d2',
    mac: '60:e3:ac:f7:ff:ff',
    ip: '192.168.0.137',
    vlan: 1,
    switchport: '1' }]
     */
    getClients(serial, timespan) {
        if (!serial) {
            return Promise.reject(new Error('The serial is required'))
        }
        return this.meraki.get('/devices/' + serial + '/clients?timespan=' + timespan).then((res) => res.data);
    },
    /**
     * Return client usage history
     * @memberof module:Clients
     * @param {*} netId 
     * @param {*} client 
     */
    getClientUsageHistory(netId, client) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        if (!client) {
            return Promise.reject(new Error('The client MAC or client ID is required'))
        }
        return this.meraki.get('/networks/' + netId + '/clients/' + client).then((res) => res.data);
    },
    /**
     * Returnpolicy for a Client in a Network
     * @memberof module:Clients
     * @param {*} netId 
     * @param {*} clientMac 
     * @param {*} timespan 
     */
    getClientPolicy(netId, clientMac, timespan) {
        return this.meraki.get('/networks/' + netId + '/clients/' + clientMac + '/policy?timespan=' + timespan).then((res) => res.data);
    },

    /**
     * update the policy for a Client in a Network
     * @memberof module:Clients
     * @param {*} netId 
     * @param {*} clientMac 
     * @param {*} timespan 
     * @param {*} data 
     */
    updateClientPolicy(netId, clientMac, timespan, data) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        if (!clientMac) {
            return Promise.reject(new Error('The clientMac is required'))
        }
        return this.meraki.put('/networks/' + netId + '/clients/' + clientMac + '/policy?timespan=' + timespan, data).then((res) => res.data);
    },

    /**
     * Return the splash authorization for a client, for each SSID they've associated with through splash.
     * @memberof module:Clients
     * @param {*} netId 
     * @param {*} clientMac 
     */
    getSplashAuth(netId, clientMac) {
        return this.meraki.get('/networks/' + netId + '/clients/' + clientMac + '/splashAuthorizationStatus').then((res) => res.data);
    },

    /**
     * Return the splash authorization for a client, for each SSID they've associated with through splash.
     * @memberof module:Clients
     * @param {*} netId 
     * @param {*} clientMac 
     * @param {*} body 
     */
    updateSplashAuth(netId, clientMac, body) {
        return this.meraki.put('/networks/' + netId + '/clients/' + clientMac + '/splashAuthorizationStatus', body).then((res) => res.data);
    }
}

module.exports = clients;