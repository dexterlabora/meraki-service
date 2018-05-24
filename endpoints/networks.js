
const networks = {
    // ****************
    // Networks
    // ****************

    // GET Networks for an organization
    getNetworks(orgId) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        return this.meraki.get('/organizations/' + orgId + '/networks').then((res) => res.data);
    },

    // GET Network 
    getNetwork(netId) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        return this.meraki.get('/networks/' + netId).then((res) => res.data);
    },

    // PUT Network 
    updateNetwork(netId, data) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        if (!data) {
            return Promise.reject(new Error('The body is required'))
        }
        return this.meraki.put('/networks/' + netId, data).then((res) => res.data);
    },

    // POST Network in an organization
    createNetwork(orgId, data) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        if (!data) {
            return Promise.reject(new Error('The body is required'))
        }
        return this.meraki.post('/organizations/' + orgId + '/networks', data).then((res) => res.data);
    },

    // DELETE Network
    deleteNetwork(netId) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        return this.meraki.delete('/networks/' + netId).then((res) => res.data);
    },

    // GET Traffic for a network
    getTraffic(netId, timespan) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        if (!timespan) {
            return Promise.reject(new Error('The timespan is required'))
        }
        return this.meraki.get('/networks/' + netId + '/traffic?timespan=' + timespan).then((res) => res.data);
    },

    // GET access policies for a network of switches
    getAccessPolicies(netId) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        return this.meraki.get('/networks/' + netId + '/accessPolicies').then((res) => res.data);
    },

    // GET return the bluetooth settings for a network (MR)
    getBluetoothSettings(netId) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        return this.meraki.get('/networks/' + netId + '/bluetoothSettings').then((res) => res.data);
    },

    // PUT update the bluetooth settings for a network (MR)
    updateBluetoothSettings(netId) {
        if (!netId) {
            return Promise.reject(new Error('The netId is required'))
        }
        return this.meraki.put('/networks/' + netId + '/bluetoothSettings').then((res) => res.data);
    },

    // GET List Air Marshal scan results from a network
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