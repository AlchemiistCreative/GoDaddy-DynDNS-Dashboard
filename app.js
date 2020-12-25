const rp = require('request-promise')
const publicIp = require('public-ip');
var querystring = require('querystring');



const mydomain1 = ""
const hostname1 = ""
const gdapikey = "";
const gdapisecret = "";


async function GDDynDns(mydomain, hostname){

  const ipv4 = await publicIp.v4();



  const data = 	[
    {
      "data": `${ipv4}`,
      "port": 1,
      "priority": 1,
      "ttl": 600,
      "weight": 0
    }
  ]

  console.log(data)


  var options = {
    method: 'PUT',
    url: `https://api.godaddy.com/v1/domains/${mydomain}/records/A/${hostname}`,
    headers: {
      'Authorization': `sso-key ${gdapikey}:${gdapisecret}`,
      'Content-Type': 'application/json',
      'Content-Lenght': data.length
    },
    json: data
  }
rp(options)
.then(function (parsedBody) {
   console.log(parsedBody);
})
.catch(function (err) {
  console.log(err.message);
});


}

GDDynDns(mydomain1, hostname1);
 
    
      

    
    