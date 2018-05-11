
## meraki-service

# A Meraki Dashboard API endpoint service

A collection of functions to interact with the Meraki API. 

-- For use with NodeJS

## Features: 
* Collection of common Dashboard API calls
* Handles URL redirects
* Handles Meraki error messages
* Custom scripts for common API traversals

---

## Install

```
npm install <this-repository>
```
`npm install https://github.com/dexterlabora/meraki-service.git`

or 

```
npm install meraki-service
```

## Usage

## API endpoint methods

```
// index.js
const Meraki = require('meraki-service');
const meraki = new Meraki('YourAPIKey','https://api.meraki.com/api/v0');

meraki.getOrganizations().then(res => {
    console.log('Organizations: ', res.data);
});
```
`$ Organizations:  [ { id: 549236, name: 'Meraki DevNet Sandbox' } ]`



## As an Express API proxy

```
app.use('/api', jsonParser, function (req, res){
    console.log('API request ', req.method, req.url, req.method != 'GET' ? req.body:'');
    
    var options = {
      url: req.url,
      method: req.method,
      body: JSON.stringify(req.body)
    };

    const apiKey = req.headers['x-cisco-meraki-api-key'] || configs.apiKey;
    const meraki = new Meraki(apiKey,configs.apiUrl);
    meraki.proxy(options).then((response) => {
      res.send(response.data);
      res.end();
    });
  
});
```

## Further Development
It is easy to duplicate any of the methods and modify them for new API endpoints.