// testmeraki.js
const Meraki = require('.././meraki-service');

// Environment Variables
/*
const API_KEY = process.env.API_KEY || 'be647eed3046542a895ea9ad07b7f7cef4c002de'; //'2f301bccd61b6c642d250cd3f76e5eb66ebd170f' // Sandbox API Key
const API_URL = "https://api.meraki.com/api/v0";//'http://localhost:8888' //"https://api.meraki.com/api/v0"; //

const orgId = '306267';
const netId = 'L_646829496481095933';
const deviceMac = 'e0:55:3d:10:42:a6';
const serial = 'Q2HP-6Z82-NGDM';
*/

// PII ENV
const API_KEY = '2f301bccd61b6c642d250cd3f76e5eb66ebd170f'; // Sandbox Demos
const API_KEY2 = '5903a78f49af79332369201c02b31891dff83501'; // GDPR
const orgId = '773901';
const netId = 'N_660903245316632307';
const deviceMac = '88:15:44:60:1c:1a';
const serial = 'Q2HP-ZQDY-79F9';
const clientMac = 'e0:cb:bc:0a:09:96';
const piiId = '660903245316620289'


// Initialize Meraki
//const meraki = new Meraki(API_KEY,API_URL);
const meraki = new Meraki(API_KEY); // default settings

// ********************
// Various test scripts
//  - uncomment out any section of code and run:   $ node test
// ********************

var url = meraki.baseUrl;
console.log('API Base URL: ', url);



/**
 * PII Requests
 */

 /*
meraki.getPiiRequests(orgId).then((res) => {
    console.log('Pii Requests', res.data);
});
*/
/*
const optionsPiiKeys = {
    
}
meraki.getPiiKeys(orgId, optionsPiiKeys).then((res) => {
    console.log(res.data);
});
*/

/*
meraki.getOrganizations().then(res => {
    console.log('Organizations: ', res);
    console.log('res.data[0]', res[0]);
});
*/

/*
const NEW_KEY = '2f301bccd61b6c642d250cd3f76e5eb66ebd170f';
meraki.apiKey = NEW_KEY;
*/
/*
meraki.getOrganizations().then(res => {
    console.log('Organizations: ', res.data);
});
*/


/*
meraki.getNetworks(orgId).then(
    res => {
    console.log('Networks: ', res.data);
    },
    err => {
        console.log(err);
    });
*/

/*
meraki.getClients(serial, 86400).then((res) => {
    console.log(res.data);
});
*/

/*
meraki.getOrgDevices(orgId).then(res => {
    console.log('Organizations: ', res.data);
});
*/

/*
meraki.getClientsForOrg(orgId).then(
    res => {
    console.log('Clients for Org: ', res.data);
    },
    err => {
        console.log(err);
    });
*/

/*
meraki.getSwitchPorts(serial).then(res => {
    console.log('Switch Ports: ', res.data);
});
*/

/*
meraki.getAdmins(orgId).then(res => {
    console.log('Admins: ', res.data);
});
*/


const proxyOptions = {
    url: '/organizations',
    method: 'get',
    headers: {
        'X-Cisco-Meraki-API-Key': API_KEY2,
        'Content-Type': 'application/json'
      } 
}
meraki.proxy(proxyOptions).then(res => {
    console.log('Organizations proxied with custom headers: ', res);
});



/*
const proxyOptions = {
    url: '/organizations',
    method: 'get'
}
meraki.proxy(proxyOptions).then(res => {
    console.log('Organizations proxied: ', res);
    console.log('res.data[0]', res[0]);
});
*/


/*
meraki.getClientsForOrg(orgId, 8640000, 'MR').then(res => {
    console.log('Clients: ', res.data);
});
*/

/*
meraki.getClientsForOrg('306267', 86400).then(res => {
    console.log('Clients: ', res.data);
});
*/

/*
meraki.getInventory(orgId, 86400).then(res => {
    console.log('inventory: ', res.data);
});
*/

/*
const devices = [
    {
        serial: 'Q2HN-A4LT-QJUN',
    },
    {
        serial: 'Q2QN-58EA-7NTY',
    }
]
meraki.getClientsForDevices(devices, 86400).then(res => {
    console.log('Clients: ', res.data);
});
*/

/*
const networks = [
    {
        id: 'L_643451796760560141',
    },
    {
        id: 'L_646829496481098845',
    }
]
meraki.getClientsForNetworks(networks, 864000000).then(res => {
    console.log('Clients: ', JSON.stringify(res.data));
});
*/

/*
meraki.getClientsForOrg(orgId, 864000).then(res => {
    console.log('Clients: ', JSON.stringify(res.data));
});
*/

/*
meraki.getClientsForNetwork('L_643451796760560141', 86400, 'MR').then((res) => {
    console.log('Clients: ', res.data);
});
*/




/*
const clientMac = '60:e3:ac:f7:48:08';
const networkId = 'L_643451796760560141';
const timespan = 172800;
const data = {
    "devicePolicy": "group",
    "groupPolicyId": 101
};
meraki.updateClientPolicy(netId, clientMac, timespan, data)
    .then(res => {
        console.log('policy updated', res.data);
    },
        err => {
            console.log(err);
        });
*/

/*
meraki.getNetworkIdForDeviceMac(orgId, deviceMac).then((res) => {
    console.log('Network for device: ',deviceMac, res.data);
});
*/

/*
const clients = [
    { mac: "d0:2b:20:91:90:67"},
    { mac: "74:da:38:56:0a:80"},
    { mac: '60:e3:ac:f7:48:08'}
]
meraki.getClientPolicyForClients(clients, netId, 86400).then((res) => {
    console.log('Clients: ',res.data);
});
*/
