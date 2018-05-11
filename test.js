// testmeraki.js
const Meraki = require('./meraki-service');

// Environment Variables
const API_KEY = "2f301bccd61b6c642d250cd3f76e5eb66ebd170f" // Sandbox API Key
const API_URL = 'https://api.meraki.com/api/v0'

const orgId = '306267';
const netId = 'L_643451796760560141';
const deviceMac = '88:15:44:60:1c:1a';


// Initialize Meraki
const meraki = new Meraki(API_KEY,API_URL);


// Various test scripts


meraki.getOrganizations().then(res => {
    console.log('Organizations: ', res.data);
});

const proxyOptions = {
    url: '/organizations',
    method: 'get',
    headers: {
        "X-Cisco-Meraki-API-Key":API_KEY
    }
}
meraki.proxy(proxyOptions).then(res => {
    console.log('Organizations proxied with custom headers: ', res.data);
});


/*
const proxyOptions = {
    url: '/organizations',
    method: 'get'
}
meraki.proxy(proxyOptions).then(res => {
    console.log('Organizations proxied: ', res.data);
});
*/

/*
meraki.getClientsForOrg('306267', 86400, 'MR').then(res => {
    console.log('Clients: ', res.data);
});
*/
/*
meraki.getClientsForOrg('306267', 86400).then(res => {
    console.log('Clients: ', res.data);
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
        id: 'N_643451796760559911',
    }
]
meraki.getClientsForNetworks(networks, 86400).then(res => {
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
const policy = {
    "devicePolicy": "group",
    "groupPolicyId": 101
  };
meraki.updateClientPolicy(networkId, clientMac, 2592000, policy)
    .then((res)=>{
      console.log('policy updated', res.data);    
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
