const saml = {
    // *********
    // SAML Roles
    // *********

    // GET List the SAML roles for this organization
    getSamlRoles(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/samlRoles').then((res) => res.data);
    },

    // GET Return a SAML role
    getSamlRoles(orgId, samlId) {
        return this.meraki.get('/organizations/' + orgId + '/samlRoles/' + samlId).then((res) => res.data);
    },

    // PUT Update a SAML role
    updateSamlRole(orgId, samlId, body) {
        return this.meraki.put('/organizations/' + orgId + '/samlRoles/' + samlId, body).then((res) => res.data);
    },

    // POST Create a SAML role
    createSamlRoles(orgId) {
        return this.meraki.post('/organizations/' + orgId + '/samlRoles').then((res) => res.data);
    },

    // DELET REmove a SAML role
    deleteSamlRole(orgId, samlId) {
        return this.meraki.put('/organizations/' + orgId + '/samlRoles/' + samlId).then((res) => res.data);
    }
}

module.exports = saml;