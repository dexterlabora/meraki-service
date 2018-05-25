/**
 * Config Templates
 * @module Config_Templates
 */
const configTemplates = {

    /**
     * Return the config templates for an organization
     * @memberof module:Config_Templates
     * @param {*} orgId 
     */
    getConfigTemplates(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/configTemplates').then((res) => res.data);
    },

    /**
     * Delete a configuration template
     * @memberof module:Config_Templates
     * @param {*} orgId 
     * @param {*} templateId 
     */
    removeConfigTemplate(orgId, templateId) {
        return this.meraki.delete('/organizations/' + orgId + '/configTemplates/' + templateId).then((res) => res.data);
    },

    /**
     * Bind network to template
     * @memberof module:Config_Templates
     * @param {*} netId 
     * @param {*} data 
     */
    bindTemplate(netId, data) {
        return this.meraki.post('/networks/' + netId + '/bind', data).then((res) => res.data);
    },

    /**
     * Unbind network from template
     * @memberof module:Config_Templates
     * @param {*} netId 
     * @param {*} data 
     */
    unbindTemplate(netId, data) {
        return this.meraki.post('/networks/' + netId + '/unbind', data).then((res) => res.data);
    }


}

module.exports = configTemplates;