/**
 * SAML Roles
 * @module SAML_Roles
 */
const saml = {
    /**
     * Return the SAML roles for this organization
     * @memberof module:SAML_Roles
     * @param {*} orgId 
     */
    getSamlRoles(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/samlRoles').then((res) => res.data);
    },

    /**
     * Return a SAML role
     * @memberof module:SAML_Roles
     * @param {*} orgId 
     * @param {*} samlId 
     */
    getSamlRoles(orgId, samlId) {
        return this.meraki.get('/organizations/' + orgId + '/samlRoles/' + samlId).then((res) => res.data);
    },

    /**
     * Update a SAML role
     * @memberof module:SAML_Roles
     * @param {*} orgId 
     * @param {*} samlId 
     * @param {*} body 
     */
    updateSamlRole(orgId, samlId, body) {
        return this.meraki.put('/organizations/' + orgId + '/samlRoles/' + samlId, body).then((res) => res.data);
    },

    /**
     * Create a SAML role
     * @memberof module:SAML_Roles
     * @param {*} orgId 
     */
    createSamlRoles(orgId) {
        return this.meraki.post('/organizations/' + orgId + '/samlRoles').then((res) => res.data);
    },

    /**
     * Remove a SAML role
     * @memberof module:SAML_Roles
     * @param {*} orgId 
     * @param {*} samlId 
     */
    deleteSamlRole(orgId, samlId) {
        return this.meraki.put('/organizations/' + orgId + '/samlRoles/' + samlId).then((res) => res.data);
    }
}

module.exports = saml;