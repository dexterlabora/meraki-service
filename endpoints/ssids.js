/**
 * SSIDs
 * @module SSIDs
 */
const ssids = {

    /**
     * Return SSIDs for an organization
     * @memberof module:SSIDs
     * @param {*} netId 
     */
    getSsids(netId) {
        return this.meraki.get('/networks/' + netId + '/ssids').then((res) => res.data);
    },

    /**
     * Return SSIDs for an organization
     * @memberof module:SSIDs
     * @param {*} netId 
     * @param {*} ssidNum 
     */
    getSsid(netId, ssidNum) {
        return this.meraki.get('/networks/' + netId + '/ssids/' + ssidNum).then((res) => res.data);
    },

    /**
     * Update SSID
     * @memberof module:SSIDs
     * @param {*} netId 
     * @param {*} number 
     * @param {*} data 
     */
    updateSsid(netId, number, data) {
        return this.meraki.put('/networks/' + netId + '/ssids/' + number, data).then((res) => res.data);
    }

}

module.exports = ssids;