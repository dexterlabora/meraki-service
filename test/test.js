// testmeraki.js
const Meraki = require(".././meraki-service");

// Environment Variables

const API_KEY =
  process.env.API_KEY || "be647eed3046542a895ea9ad07b7f7cef4c002de"; // Sandbox API Key
const API_URL = "https://api.meraki.com/api/v0"; //'http://localhost:8888' //"https://api.meraki.com/api/v0"; //

const orgId = "549236";
const netId = "L_643451796760560141";
const deviceMac = "e0:55:3d:10:42:a6";
const serial = "Q2HP-6Z82-NGDM";

// PII ENV
/*
const API_KEY = 'be647eed3046542a895ea9ad07b7f7cef4c002de'; // Sandbox Demos
const orgId = '773901';
const netId = 'N_660903245316632307';
const deviceMac = '88:15:44:60:1c:1a';
const serial = 'Q2HP-ZQDY-79F9';
const clientMac = '0c:8d:db:95:8b:83';
const piiId = '660903245316620289'
*/

// Initialize Meraki
//const meraki = new Meraki(API_KEY,API_URL);
const meraki = new Meraki(API_KEY); // default settings

// ********************
// Various test scripts
//  - uncomment out any section of code and run:   $ node test
// ********************

var url = meraki.baseUrl;
console.log("API Base URL: ", url);

/*
meraki.getClientUsageHistory(netId, clientMac).then(res => {
    console.log('getCliennUsageHistory', res);
})
*/

/**
 * PII Requests
 */

/*
meraki.getPiiRequests(orgId).then((res) => {
   console.log('Pii Requests', res);
});
*/
/*
const optionsPiiKeys = {
    
}
meraki.getPiiKeys(orgId, optionsPiiKeys).then((res) => {
    console.log(res);
});
*/

meraki.getOrganizations().then(res => {
  console.log("Organizations: ", res);
});

/*
const NEW_KEY = '2f301bccd61b6c642d250cd3f76e5eb66ebd170f';
meraki.apiKey = NEW_KEY;
*/
/*
meraki.getOrganizations().then(res => {
    console.log('Organizations: ', res);
});
*/

/*
meraki.getNetworks(orgId).then(
    res => {
    console.log('Networks: ', res);
    },
    err => {
        console.log(err);
    });
*/

/*
meraki.getClients(serial, 86400).then((res) => {
    console.log(res);
});
*/

/*
meraki.getOrgDevices(orgId).then(res => {
    console.log('Organizations: ', res);
});
*/

/*
meraki.getClientsForOrg(orgId).then(
    res => {
    console.log('Clients for Org: ', res);
    },
    err => {
        console.log(err);
    });
*/

/*
meraki.getSwitchPorts(serial).then(res => {
    console.log('Switch Ports: ', res);
});
*/

/*
meraki.getAdmins(orgId).then(res => {
    console.log('Admins: ', res);
});
*/

/*
const proxyOptions = {
    url: '/organizations',
    method: 'get',
    headers: {
        'X-Cisco-Meraki-API-Key': API_KEY,
        'Content-Type': 'application/json'
    }
}
meraki.proxy(proxyOptions).then(res => {
    console.log('Organizations proxied with custom headers: ', res);
});
*/

/*
const proxyOptions = {
    url: '/organizations',
    method: 'get'
}
meraki.proxy(proxyOptions).then(res => {
    console.log('Organizations proxied: ', res);
    console.log('res[0]', res[0]);
});
*/

/*
meraki.getClientsForOrg(orgId, 8640000, 'MR').then(res => {
    console.log('Clients: ', res);
});
*/

/*
meraki.getClientsForOrg('306267', 86400).then(res => {
    console.log('Clients: ', res);
});
*/

/*
meraki.getInventory(orgId, 86400).then(res => {
    console.log('inventory: ', res);
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
    console.log('Clients: ', res);
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
    console.log('Clients: ', JSON.stringify(res));
});
*/

/*
meraki.getClientsForOrg(orgId, 864000).then(res => {
    console.log('Clients: ', JSON.stringify(res));
});
*/

/*
meraki.getClientsForNetwork('L_643451796760560141', 86400, 'MR').then((res) => {
    console.log('Clients: ', res);
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
        console.log('policy updated', res);
    },
        err => {
            console.log(err);
        });
*/

/*
meraki.getNetworkIdForDeviceMac(orgId, deviceMac).then(res => {
  console.log("Network for device: ", deviceMac, res);
});
*/

/*
const clients = [
    { mac: "d0:2b:20:91:90:67" },
    { mac: "74:da:38:56:0a:80" },
    { mac: '60:e3:ac:f7:48:08' }
]
meraki.getClientPolicyForClients(netId, clients, 86400).then((res) => {
    console.log('Clients: ', res);
});
*/

/*
function fetchClientsForNetwork() {
    if (!netId) {
        return;
    }
    let clients = [];
    // Get Clients
    meraki
        .getClientsForNetwork(netId, '86400', 'MR')
        .then(res => {
            clients = res;
            console.log("getClientsForNetwork res", res);
            //return (this.clients = this.removeDuplicates(this.clients, "id"));
        })
        // Get Policy for Each Client
        .then(() => {
            if (!clients) {
                return;
            }
            meraki
                .getClientPolicyForClients(netId, clients, '86400')
                .then(res => {
                    //this.clients = res;
                    clientsAndPolicy = res;
                    console.log('getClientPolicyForClients clientsAndPolicy', clientsAndPolicy);
                    clientsAndPolicy = addPolicyNames(
                        clients,
                        policies
                    );
                    console.log('getClientPolicyForClients clients', clients);
                    console.log('clientsAndPolicy', clientsAndPolicy);
                });
        });
}

function addPolicyNames(clients, policies) {
    console.log("addPolicyNames");
    let newClients = [];
    clients.forEach(c => {
        if (!c.policy) {
            return;
        }
        policies.forEach(p => {
            if (c.policy.groupPolicyId) {
                if (p.groupPolicyId == c.policy.groupPolicyId) {
                    c.policy.name = p.name;
                }
            }
        });
        newClients.push(c);
    });
    return newClients;
}

let policies;
meraki.getPolicies(netId).then(res => {
    console.log('policies res', res)
    policies = res;
    fetchClientsForNetwork();
});

//fetchClientsForNetwork();
*/

/*
meraki
    .getClientsForNetwork(netId, '86400', 'MR')
    .then(res => {
        clients = res;
        console.log("getClientsForNetwork res", res);
        //return (this.clients = this.removeDuplicates(this.clients, "id"));
    });
    */
/*
meraki
    .getClientsForOrg(orgId, '86400', 'MR')
    .then(res => {
        clients = res;
        console.log("getClientsForNetwork res", res);
        //return (this.clients = this.removeDuplicates(this.clients, "id"));
    });
    */
