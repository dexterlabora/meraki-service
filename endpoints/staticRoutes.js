/**
 * Static Routes
 * @module Static_Routes
 */
const staticRoutes = {

    /**
     * Return the static routes for this network
     * @memberof module:Static_Routes
     * @param {*} netId 
     */
    getStaticRoutes(netId) {
        return this.meraki.get('/networks/' + netId + '/staticRoutes').then((res) => res.data);
    },

    /**
     * Return a static route
     * @memberof module:Static_Routes
     * @param {*} netId 
     * @param {*} srId 
     */
    getStaticRoute(netId, srId) {
        return this.meraki.get('/networks/' + netId + '/staticRoutes/' + srId).then((res) => res.data);
    },

    /**
     * Update SSID
     * @memberof module:Static_Routes
     * @param {*} netId 
     * @param {*} srId 
     * @param {*} data 
     */
    updateStaticRoute(netId, srId, data) {
        return this.meraki.put('/networks/' + netId + '/staticRoutes/' + srId, data).then((res) => res.data);
    },

    /**
     * Add a static route
     * @memberof module:Static_Routes
     * @param {*} netId 
     * @param {*} body 
     */
    addStaticRoute(netId, body) {
        return this.meraki.post('/networks/' + netId + '/staticRoutes', body).then((res) => res.data);
    },

    /**
     * Delete a static route
     * @memberof module:Static_Routes
     * @param {*} netId 
     * @param {*} srId 
     */
    deleteStaticRoute(netId, srId) {
        return this.meraki.delete('/networks/' + netId + '/staticRoutes/' + srId).then((res) => res.data);
    }
}

module.exports = staticRoutes;