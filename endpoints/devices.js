/**
 * Devices
 * @module Devices
 */
const devices = {
    /**
     * Return devices for a network
     * @memberof module:Devices
     * @param {*} netId 
     * @return { Promise } A promise holding an array of devices
     */
    getDevices(netId) {
        return this.meraki.get('/networks/' + netId + '/devices').then((res) => res.data);
    },

    /**
     * Return a single device in a network
     * @memberof module:Devices
     * @param {*} netId 
     * @param {*} serial 
     * @return { Promise } A promise holding the device object
     */
    getDevice(netId, serial) {
        return this.meraki.get('/networks/' + netId + '/devices/' + serial).then((res) => res.data);
    },

    /**
     * Return performance score for a single device (MX)
     * @memberof module:Devices
     * @param {*} netId 
     * @param {*} serial 
     * @return { Promise } A promise holding the performance score
     */
    getPerfScore(netId, serial) {
        return this.meraki.get('/networks/' + netId + '/devices/' + serial + '/performance').then((res) => res.data);
    },

    /**
     * Update the attributes of a single device
     * @memberof module:Devices
     * @param {*} netId 
     * @param {*} serial 
     * @param {*} body 
     * @return { Promise }
     */
    updateDevice(netId, serial, body) {
        return this.meraki.get('/networks/' + netId + '/devices/' + serial, body).then((res) => res.data);
    },

    /**
     * Return uplink status for a device
     * @memberof module:Devices
     * @param {*} netId 
     * @param {*} serial 
     * @return { Promise } A promise holding the uplink status
     */
    getUplinkStatus(netId, serial) {
        return this.meraki.get('/networks/' + netId + '/devices/' + serial + '/uplink').then((res) => res.data);
    },

    /**
     * Claim a device
     * @memberof module:Devices
     * @param {*} netId 
     * @param {*} body 
     * @return { Promise } 
     */
    claimDevice(netId, body) {
        return this.meraki.post('/networks/' + netId + '/devices/claim', body).then((res) => res.data);
    },

    /**
     * Remove a device from a network (no post body required)
     * @memberof module:Devices
     * @param {*} netId 
     * @param {*} serial 
     * @return { Promise } 
     */
    removeDevice(netId, serial) {
        return this.meraki.post('/networks/' + netId + '/devices/' + serial + '/remove').then((res) => res.data);
    }
}

module.exports = devices;
