/**
 * Custom Scripts
 * 
 * These scripts are helfpul for iterating through API endpoints, chaining data or returing enhanced results.
 * 
 * @module Custom
 */
const custom = {

    /**
     * Get the network ID for a Meraki Device using its MAC address
     * @memberof module:Custom
     * @async
     * @param {string} orgId - Meraki Organization ID
     * @param {string} mac - Meraki device MAC address
     */
    async getNetworkIdForDeviceMac(orgId, mac) {
        const device = await this.getOrgDevices(orgId).then((res) => {

            const devices = [] = res.data.filter(function (obj) {
                return obj.mac == mac;
            });
            console.log('filtered devices ', devices);
            console.log('filtered network ID ', devices[0].networkId);
            return devices[0];

        });
        let res = {
            status: 200,
            data: device.networkId
        };
        return res;
    },

    /**
     * get clients for an organization within specified timespan
     * @memberof module:Custom
     * @param {string} orgId 
     * @param {number=} [timespan=86400] - Timespan to search for clients in seconds
     */
    async getClientsForOrg(orgId, timespan = 86400) {
        let devices = [] = await this.getOrgDevices(orgId).then((res) => { return res.data }); // doesn't return model type
        console.log('devices in org', devices);
        let clients = [];
        for (let d of devices) {
            try {
                let c = await this.getClients(d.serial, timespan).then((res) => { return res.data });
                console.log('Clients for device', c);
                if (c.errors) { continue }
                c.device = d;
                clients.push(c);
            } catch (e) {
                continue;
            }
        }
        let res = {
            status: 200,
            data: clients
        };
        return res;
    },

    /**
     * get clients for devices
     * @memberof module:Custom
     * @param {Array} devices - Array of devices, `[{serial: abcd-asdf-asdf}, {serial: qwer-asdf-asdf}]`
     * @param {number=} [timespan=86400] - Timespan to search for clients in seconds
     * @param {string=} model - Meraki device model `MR`, `MS`, `MX`
     */
    async getClientsForDevices(devices, timespan = 86400, model) {
        let clients = [];
        for (let d of devices) {
            if (model) {
                if (!d.model.includes(model)) { continue }
            } else {
                if (!d.model.includes("MR") && !d.model.includes("MX") && !d.model.includes("MS")) { continue }
            }
            try {
                let c = await this.getClients(d.serial, timespan).then((res) => res.data);
                if (c.errors) { continue }
                c.device = d;
                clients.push(c);
            } catch (e) { continue }
        }
        let res = {
            status: 200,
            data: clients
        };
        return res;
    },

    /**
     * get clients for devices
     * @memberof module:Custom
     * @param {Array} networks - Array of networks, `[{id: L_123456789}, {id: N_1234567890}]`
     * @param {number=} [timespan=86400] - Timespan to search for clients in seconds
     * @param {string=} model - Meraki device model `MR`, `MS`, `MX`
     */
    async getClientsForNetworks(networks, timespan = 86400, model) {
        let clients = [];
        for (let n of networks) {
            if (model) {
                if (!d.model.includes(model)) { continue }
            }
            try {
                let c = await this.getClientsForNetwork(n.id, timespan, model).then((res) => res.data);
                c.network = n;
                clients.push(c);
            } catch (e) { continue }
        }
        let res = {
            status: 200,
            data: clients
        };
        return res;
    },

    /**
     * Synchronous script to traverse the Meraki API and display the clients and their policies
     * @memberof module:Custom
     * @param {string} networkId - Network ID `L_123456789`
     * @param {number=} [timespan=86400] - Timespan to search for clients in seconds
     * @param {string=} model - Meraki device model `MR`, `MS`, `MX`
     */
    async getClientsForNetwork(netId, timespan, model) {
        // where model = "MR" MV MX MS MC or model name "MR33"
        let devices = [] = await this.getDevices(netId).then((res) => res.data);
        let clients = [];
        for (let d of devices) {
            if (model) {
                if (!d.model.includes(model)) { continue }
            }
            try {
                let c = await this.getClients(d.serial, timespan).then((res) => { return res.data });
                c.device = d;
                clients.push(c);
            } catch (e) { continue }
        }
        let res = {
            status: 200,
            data: clients
        };
        return res;
    },

    /**
     * gets the client policy for an array of clients in a network.
     * @memberof module:Custom
     * @param {Array} clients Array of clients with MAC property `[{mac: 'aa:bb:cc:dd:ee:ff}, {mac: 'bb:bb:cc:dd:ee:ff}]`
     * @param {string} networkId - ID of network `L_123456789`
     * @param {number=} [timespan=86400] - Timespan to search for clients
     */
    async getClientPolicyForClients(clients, netId, timespan = 86400) {
        let allClients = [];
        for (let c of clients) {
            try {
                const policy = await this.getClientPolicy(netId, c.mac, timespan).then((res) => { return res.data });
                //console.log('policy', policy);
                if (!policy.type) { continue }
                //console.log(" - Policy type " + policy.type);
                if (policy.groupPolicyId) {
                    // console.log(" - ID: " + policy.groupPolicyId);
                }
                c.policy = policy;
                allClients.push(c);
            } catch (e) {
                console.log('error getting client policy', e);
                continue;
            }
        }
        let res = {
            status: 200,
            data: allClients
        };
        return res;
    }
}

module.exports = custom;