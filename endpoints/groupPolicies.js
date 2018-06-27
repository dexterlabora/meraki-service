/**
 * Group Policies
 * @module Group_Policies
 */
const groupPolicies = {

    /**
     * Return the Group Policies for a Network
     * @memberof module:Group_Policies
     * @param {*} netId 
     */
    getPolicies(netId) {
        return this.meraki.get('/networks/' + netId + '/groupPolicies').then((res) => res.data);
    }
}

module.exports = groupPolicies;