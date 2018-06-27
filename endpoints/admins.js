/**
 * Admins
 * @module Admins
 */
const admins = {



    /**
     * List the dashboard administrators in this organization.
     *
     * @param { Object } param            The dashboard administrator information
     * @param { string } param.orgId      The organization id for which to list the admins
     * @return { Promise } A promise holding the dashboard administrators in this organization
     * @example <caption>Example response</caption>
     * [
     *   {
     *     "id":"1",
     *     "name":"Miles Meraki",
     *     "email":"miles@meraki.com",
     *     "orgAccess":"none",
     *     "tags":[
     *       {
     *         "tag":"west",
     *         "access":"read-only"
     *       }
     *     ],
     *     "networks":[
     *       {
     *         "id":"N_249",
     *         "access":"full"
     *       }
     *     ]
     *   }
     * ]
     */
    getAdmins(orgId) {
        return this.meraki.get('/organizations/' + orgId + '/admins').then((res) => res.data);
    },

    /**
     * Create a new dashboard administrator.
     *
     * @memberof module:Admins
     * @param { Object } param            The dashboard administrator information
     * @param { string } param.orgId      The organization id
     * @param { string } param.email      The email of the dashboard administrator. This attribute can not be updated
     * @param { string } param.name       The name of the dashboard administrator
     * @param { string } param.orgAcess   The privilege of the dashboard administrator on the organization (full, read-only, none)
     * @param { Array }  param.tags       The list of tags that the dashboard administrator has privileges on
     * @return { Promise } A promise holding the newly created dashboard administrator
     * @example <caption>Example response</caption>
     * {
     *   "id":"549236",
     *   "name":"Miles Meraki",
     *   "email":"miles@meraki.com",
     *   "orgAccess":"none",
     *   "tags":[
     *     {
     *       "tag":"west",
     *       "access":"read-only"
     *     }
     *   ],
     *   "networks":[]
     * }
     */
    createAdmin(orgId, body) {
        return this.meraki.post('/organizations/' + orgId + '/admins', body).then((res) => res.data);
    },

    // PUT update a dashboard administrator
    updateAdmin(orgId, adminId) {
        return this.meraki.put('/organizations/' + orgId + '/admins/' + adminId).then((res) => res.data);
    },

    // DELETE revoke a dashboard administrator
    deleteAdmin(orgId, adminId) {
        return this.meraki.delete('/organizations/' + orgId + '/admins/' + adminId).then((res) => res.data);
    }
}

module.exports = admins