


const pii = {
    /**
     * Personal Idetifying Information
     * @module Pii
     */

    /**
     * List the keys required to access Personally Identifiable Information (PII) for a given identifier. 
     * Exactly one identifier will be accepted. 
     * If the organization contains org-wide Systems Manager users matching the key provided then
     *  there will be an entry with the key "0" containing the applicable keys.
     * PARAMETERS
username
The username of a Systems Manager user
email
The email of a network user account or a Systems Manager device
mac
The MAC of a network client device or a Systems Manager device
serial
The serial of a Systems Manager device
imei
The IMEI of a Systems Manager device
     * @memberof module:Pii
     * @param {string} orgId
     * @param {string} pii 
     * @param {string} value
     * @return { Promise } A promise holding the PII keys
     * @example <caption>Example request</caption>
     * 
     
      
      meraki.getPiiKeys(orgId, pii).then((res) => {
        console.log(res);
      });
     * 
     * @example <caption>Example response</caption>
     * 
    Successful HTTP Status: 200
        {
        [networkId]:{
            "macs":[
            "00:77:00:77:00:77"
            ],
            "emails":[
            "fake@example.com"
            ],
            "usernames":[
            "fakename"
            ],
            "serials":[
            "abcd1234"
            ],
            "imei":[
            990000862471854
            ]
        }
        }
     */
    getPiiKeys(orgId, piiType, value) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        return this.meraki.get(`/organizations/${orgId}/pii/piiKeys?${piiType}=${value}`).then((res) => res.data);
    },

    /**
     * Given a piece of Personally Identifiable Information (PII), return the Systems Manager device ID(s) associated with that identifier. 
     * These device IDs can be used with the Systems Manager API endpoints to retrieve device details. Exactly one identifier will be accepted.
     * @memberof module:Pii
     * @param {string} orgId 
     * @param {string} pii 
     * @param {string} value
     * @return { Promise } A promise holding the device identifier
     * @example <caption>Example request</caption>
     * PARAMETERS
        username
        The username of a Systems Manager user
        email
        The email of a network user account or a Systems Manager device
        mac
        The MAC of a network client device or a Systems Manager device
        serial
        The serial of a Systems Manager device
        imei
        The IMEI of a Systems Manager device
     * 
     * meraki.getSmDevicesForKey(orgId, pii, value).then((res) => {
     *  console.log(res.data);
     * });
     * 
     * @example <caption>Example response</caption>
        {
        [networkId]:["1099541095293", "8348382288234"]
        }
     */
    getSmDevicesForKey(orgId, pii, value) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        if (!pii) {
            return Promise.reject(new Error('The pii type is required: username,email,serial or imei'))
        }
        if (!value) {
            return Promise.reject(new Error('The pii value is required: the username, email, serial or imei'))
        }
        return this.meraki.get(`/organizations/${orgId}/pii/smDevicesForKey?${pii}=${value}`).then((res) => res.data);
    },
    /**
     * Given a piece of Personally Identifiable Information (PII), return the Systems Manager owner ID(s) associated with that identifier.
     *  These owner IDs can be used with the Systems Manager API endpoints to retrieve owner details. Exactly one identifier will be accepted.
     * @memberof module:Pii
     * @param {string} orgId
     * @param {string} pii 
     * @param {string} value
     * @return { Promise } A promise holding the Systems Manager owner ID(s) associated with that identifier.
     * @example <caption>Example request</caption>
     * PARAMETERS
        username
        The username of a Systems Manager user
        email
        The email of a network user account or a Systems Manager device
        mac
        The MAC of a network client device or a Systems Manager device
        serial
        The serial of a Systems Manager device
        imei
        The IMEI of a Systems Manager device
     * 
     * meraki.getSmOwnersForKey(orgId, pii, value).then((res) => {
     *  console.log(res.data);
     * });
     * 
     * @example <caption>Example response</caption>
        {
            [networkId]:["1099541095293"]
        }
     */
    getSmOwnersForKey(orgId, pii, value) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        if (!pii) {
            return Promise.reject(new Error('The pii type is required: username,email,serial or imei'))
        }
        if (!value) {
            return Promise.reject(new Error('The pii value is required: the username, email, serial or imei'))
        }
        const params = Object.keys(key);
        const param = params[0];
        return this.meraki.get(`/organizations/${orgId}/pii/smOwnersForKey?${pii}=${value}`).then((res) => res.data);
    },
    /**
     * List the PII requests for this organization
     * @memberof module:Pii
     * @param {string} orgId 
     * @return { Promise } A promise holding the PII requests for an organization
     * @example <caption>Example request</caption>

     * 
      meraki.getPiiRequests(orgId).then((res) => {
       console.log(res);
      });
     * 
     * @example <caption>Example response</caption>
        [
        {
            "id": "1234",
            "organizationWide": false,
            "networkId": "N_1234",
            "type": "delete",
            "mac": "00:77:00:77:00:77",
            "datasets": "['usage', 'events']",
            "createdAt": 1524692227,
            "completedAt": 1524702227
        }
        ]
     */
    getPiiRequests(orgId) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        return this.meraki.get(`/organizations/${orgId}/pii/requests`).then((res) => res.data);
    },

    /**
     * Return a PII request
     * @memberof module:Pii
     * @param {string} orgId 
     * @param {string} piiId
     * @return { Promise } A promise holding the PII requests for a pii ID
     * @example <caption>Example request</caption>

     * 
        meraki.getPiiRequest(orgId, piiId).then((res) => {
            console.log(res.data);
        });
     * 
     * @example <caption>Example response</caption>
        {
        "id": "1234",
        "organizationWide": false,
        "networkId": "N_1234",
        "type": "delete",
        "mac": "00:77:00:77:00:77",
        "datasets": "['usage', 'events']",
        "createdAt": 1524692227,
        "completedAt": 1524702227
        }
     */
    getPiiRequest(orgId, piiId) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        if (!piiId) {
            return Promise.reject(new Error('The piiId is required'))
        }
        return this.meraki.get(`/organizations/${orgId}/pii/requests/${piiId}`).then((res) => res.data);
    },

    getPiiRequests(orgId) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        return this.meraki.get(`/organizations/${orgId}/pii/requests`).then((res) => res.data);
    },

    /**
     * Submit a new delete or restrict processing PII request
     * 
     * Options
type
One of "delete" or "restrict processing"

datasets
The datasets related to the provided key that should be deleted. Only applies to "delete" requests. The value "all" will be expanded to all datasets applicable to this pii_type.

username
The username of a network log in. Only applies to "delete" requests.

email
The email of a network user account. Only applies to "delete" requests.

mac
The MAC of a network client device. Applies to both "restrict processing" and "delete" requests.

smDeviceId
The sm_device_id of a Systems Manager device. The only way to "restrict processing" or "delete" a Systems Manager device. Must include "device" in the dataset for a "delete" request to destroy the device.

smUserId
The sm_user_id of a Systems Manager user. The only way to "restrict processing" or "delete" a Systems Manager user. Must include "user" in the dataset for a "delete" request to destroy the user.
     * @memberof module:Pii
     * @param {string} orgId 
     * @param {options} options
     * @return { Promise } A promise holding the PII request and status
     * @example <caption>Example request</caption>
    const options = { 
        "type":"delete", 
        "datasets":"["usage","events"]",
        "mac":"00:77:00:77:00:77"
    }

    meraki.submitPiiRequest(orgId, options).then((res) => {
      console.log(res.data);
     });
     * 
     * @example <caption>Example response</caption>
        {
            "id": "1234",
            "organizationWide": false,
            "networkId": "N_1234",
            "type": "delete",
            "mac": "00:77:00:77:00:77",
            "datasets": "['usage', 'events']",
            "status": "in progress"
        }
     */
    submitPiiRequest(orgId, options) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        if (!options) {
            return Promise.reject(new Error('The options are required'))
        }
        return this.meraki.post(`/organizations/${orgId}/pii/requests`,options).then((res) => res.data);
    },

       /**
     * Delete a restrict processing PII request
     * @memberof module:Pii
     * @param {string} orgId 
     * @param {string} piiId
     * @return { Promise } A promise holding the status code, 204 for success
     * @example <caption>Example request</caption>
     * 
     * meraki.deletePiiRequest(orgId).then((res) => {
     *  console.log(res);
     * });
     * 
     * @example <caption>Example response</caption>
        Successful HTTP Status: 204
     */
    deletePiiRequest(orgId, piiId) {
        if (!orgId) {
            return Promise.reject(new Error('The orgId is required'))
        }
        if (!piiId) {
            return Promise.reject(new Error('The piiId is required'))
        }
        return this.meraki.delete(`/organizations/${orgId}/pii/requests/${piiId}`).then((res) => res.data);
    },

   
}

module.exports = pii;