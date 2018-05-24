const configTemplates = {
    // *********
    // Config Templates
    // *********

    // GET Config templates for an organization
    getConfigTemplates(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/configTemplates').then((res) => res.data);
    },

    // DELETE a Configuration Template
    removeConfigTemplate(orgId, templateId) {
        return this.meraki.delete('/organizations/' + orgId + '/configTemplates/' + templateId).then((res) => res.data);
    },

    // POST bind Network to Template
    bindTemplate(netId, data) {
        return this.meraki.post('/networks/' + netId + '/bind', data).then((res) => res.data);
    },

    // POST unbind Network from Template
    unbindTemplate(netId, data) {
        return this.meraki.post('/networks/' + netId + '/unbind', data).then((res) => res.data);
    }


}

module.exports = configTemplates;