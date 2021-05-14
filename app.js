// API KEY  = at_UNJPsbJq0kSc6l60p7pTdkqbdiRnM
const express = require('express');
const ejs = require('ejs');
const https = require('https');
const app = express();

let dummyObject = {
   ip: '8.8.8.8',
   location: {
      country: 'US',
      region: 'California',
      city: 'Mountain View',
      lat: 37.38605,
      lng: -122.08385,
      postalCode: '94035',
      timezone: '-07:00',
      geonameId: 5375480
   },
   as: {
      asn: 15169,
      name: 'Google LLC',
      route: '8.8.8.0/24',
      domain: 'https://about.google/intl/en/',
      type: 'Content'
   },
   isp: 'Google LLC',
   proxy: { proxy: false, vpn: false, tor: false }
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
   res.render('index', { object: dummyObject });
})

app.post('/get-location', (req, res) => {
   console.log(req.body);
   let url = "https://geo.ipify.org/api/v1?apiKey=at_UNJPsbJq0kSc6l60p7pTdkqbdiRnM&ipAddress=" + req.body.ip_address;
   // const url = "https://geo.ipify.org/api/v1?apiKey=at_UNJPsbJq0kSc6l60p7pTdkqbdiRnM&ipAddress=66.196.64.0";
   https.get(url, (request) => {
      request.on('data', data => {
         const IPdata = JSON.parse(data);
         console.log(IPdata);
         res.render('index', { object: IPdata });
      })
   })
})

app.listen(process.env.PORT || 3000, () => {
   console.log("server started on port 3000");
})