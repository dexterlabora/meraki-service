const groupPolicies = {
    // ****************
    // Group Policies
    // ****************

    // GET List Group Policies for a Network
    getPolicies(netId) {
        return this.meraki.get('/networks/' + netId + '/groupPolicies').then((res) => res.data);
    }
}

module.exports = groupPolicies;