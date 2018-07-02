// testmeraki.js
const Meraki = require(".././meraki-service");

// Environment Variables

const API_KEY = process.env.API_KEY || ""; //
const API_URL = process.env.API_URL || "https://api.meraki.com/api/v0"; //'http://localhost:8888'

// Initialize Meraki
const meraki = new Meraki(API_KEY);
var url = meraki.baseUrl;
console.log("API Base URL: ", url);

async function testScript() {
  let orgs = [];
  let networks = [];
  let devices = [];
  let policies = [];

  orgs = await meraki.getOrganizations().then(res => res);
  console.log("Organizations: ", orgs);

  for (o of orgs) {
    const n = await meraki.getNetworks(o.id).then(res => res);
    if (n[0].id) {
      networks = [...networks, ...n];
    }
    const d = await meraki.getOrgDevices(o.id).then(res => res);
    if (d[0].serial) {
      devices[o.id] = d;
    }
  }
  console.log("Networks: ", networks);
  console.log("Devices: ", devices);

  console.log("Getting Group Policies...");
  for (n of networks) {
    const p = await meraki.getPolicies(n.id).then(res => res);
    if (n.id) {
      policies[n.id] = p;
    }
  }
  console.log("Policies", policies);
}

testScript();
