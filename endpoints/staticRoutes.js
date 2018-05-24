const staticRoutes = {
    // **************
    // Static Routes
    // **************

    // GET List the static routes for this network
    getStaticRoutes(netId) {
        return this.meraki.get('/networks/' + netId + '/staticRoutes').then((res) => res.data);
    },

    // GET Return a static route
    getStaticRoute(netId, srId) {
        return this.meraki.get('/networks/' + netId + '/staticRoutes/' + srId).then((res) => res.data);
    },

    // PUT Update SSID
    updateStaticRoute(netId, srId, data) {
        return this.meraki.put('/networks/' + netId + '/staticRoutes/' + srId, data).then((res) => res.data);
    },

    // POST Add a static route
    addStaticRoute(netId, body) {
        return this.meraki.post('/networks/' + netId + '/staticRoutes', body).then((res) => res.data);
    },

    // DELETE Delete a static route
    deleteStaticRoute(netId, srId) {
        return this.meraki.delete('/networks/' + netId + '/staticRoutes/' + srId).then((res) => res.data);
    }
}

module.exports = staticRoutes;