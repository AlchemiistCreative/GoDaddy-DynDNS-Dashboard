const rp = require('request-promise')
const publicIp = require('public-ip');
var querystring = require('querystring');



const mydomain = ""
const hostname = ""
const gdapikey = "";


async function GDDynDns(){

  const ipv4 = await publicIp.v4();



  const data = JSON.stringify({
    data: ipv4.toString()
  })
  console.log(data)


  var options = {
    method: 'PUT',
    url: `https://api.godaddy.com/v1/domains/${mydomain}/records/A/${hostname}`,
    headers: {
      'authorization': `sso-key ${gdapikey}`,
      'content-type': 'application/json'
    },
    body: [ data ],
    json: true
  }
rp(options)
.then(function (parsedBody) {
   console.log(parsedBody);
})
.catch(function (err) {
  console.log(err);
});


}

GDDynDns();
 
    
      

    
    