// testmeraki.js
const Meraki = require('.././meraki-service');

// Environment Variables

const API_KEY = process.env.MERAKI_API_KEY || '2f301bccd61b6c642d250cd3f76e5eb66ebd170f' // Sandbox API Key
const API_URL = "https://api.meraki.com/api/v0";//'http://localhost:8888' //"https://api.meraki.com/api/v0"; //

const orgId = '549236';
const netId = 'L_643451796760560141';
const deviceMac = 'e0:55:3d:10:42:a6';
const serial = 'Q2HP-6Z82-NGDM';


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
console.log('API Base URL: ', url);

meraki.getOrganizations().then((res) => {
  console.log(res)
})

