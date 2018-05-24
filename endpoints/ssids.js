const ssids = {
    // *********
    // SSIDs
    // *********

    // GET SSIDs for an organization
    getSsids(netId) {
        return this.meraki.get('/networks/' + netId + '/ssids').then((res) => res.data);
    },

    // GET SSIDs for an organization
    getSsid(netId, ssidNum) {
        return this.meraki.get('/networks/' + netId + '/ssids/' + ssidNum).then((res) => res.data);
    },

    // PUT Update SSID
    updateSsid(netId, number, data) {
        return this.meraki.put('/networks/' + netId + '/ssids/' + number, data).then((res) => res.data);
    }

}

module.exports = ssids;