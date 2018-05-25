
/**
 * Networks
 * @module Networks
 */
const networks = {

    /**
     * Return networks for an organization
     * @param {*} orgId 
     */
    getNetworks(orgId) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        return this.meraki.get('/organizations/' + orgId + '/networks').then((res) => res.data);
    },

    /**
     * Return a network
     * @memberof module:Networks
     * @param {*} netId 
     */
    getNetwork(netId) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        return this.meraki.get('/networks/' + netId).then((res) => res.data);
    },

    /**
     * Update a network
     * @memberof module:Networks
     * @param {*} netId 
     * @param {*} data 
     */
    updateNetwork(netId, data) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        if (!data) {
            return Promise.reject(new Error('The body is required'))
        }
        return this.meraki.put('/networks/' + netId, data).then((res) => res.data);
    },

    /**
     * Create a network
     * @memberof module:Networks
     * @param {*} orgId 
     * @param {*} data 
     */
    createNetwork(orgId, data) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        if (!data) {
            return Promise.reject(new Error('The body is required'))
        }
        return this.meraki.post('/organizations/' + orgId + '/networks', data).then((res) => res.data);
    },

    /**
     * Delete a network
     * @memberof module:Networks
     * @param {*} netId 
     */
    deleteNetwork(netId) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        return this.meraki.delete('/networks/' + netId).then((res) => res.data);
    },

    /**
     * Return traffic for a network
     * @memberof module:Networks
     * @param {*} netId 
     * @param {*} timespan 
     */
    getTraffic(netId, timespan) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        if (!timespan) {
            return Promise.reject(new Error('The timespan is required'))
        }
        return this.meraki.get('/networks/' + netId + '/traffic?timespan=' + timespan).then((res) => res.data);
    },

    /**
     * Return access policies for a network of switches
     * @memberof module:Networks
     * @param {*} netId 
     */
    getAccessPolicies(netId) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        return this.meraki.get('/networks/' + netId + '/accessPolicies').then((res) => res.data);
    },

    /**
     * Return the bluetooth settings for a network (MR)
     * @memberof module:Networks
     * @param {*} netId 
     */
    getBluetoothSettings(netId) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        return this.meraki.get('/networks/' + netId + '/bluetoothSettings').then((res) => res.data);
    },

    /**
     * Update the bluetooth settings for a network (MR)
     * @memberof module:Networks
     * @param {*} netId 
     */
    updateBluetoothSettings(netId) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        return this.meraki.put('/networks/' + netId + '/bluetoothSettings').then((res) => res.data);
    },

    /**
     * Return Air Marshal scan results from a network
     * @memberof module:Networks
     * @param {*} netId 
     * @param {*} timespan 
     */
    getAirmarshal(netId, timespan) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        if (!timespan) {
            return Promise.reject(new Error('The timespan is required'))
        }
        return this.meraki.get('/networks/' + netId + '/airMarshal?timespan=' + timespan).then((res) => res.data);
    }


}

module.exports = networks;