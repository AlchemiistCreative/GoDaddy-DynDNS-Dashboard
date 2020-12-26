const rp = require('request-promise')
const publicIp = require('public-ip');
var querystring = require('querystring');
const cron = require('node-cron');
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');


// Express JS

const app = express(); 


app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(require('./middlewares/flash'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let Message = require('./models/message');

  Message.all((ressources) => {

    let GD = require('./models/gd');

    GD.get_ip((ip) => {

      res.render('index', {ressources: ressources, ip: ip});


    })

  

  })
  

  

})




app.post('/add', (req, res) => {
  console.log('add');

  if(req.body.domain_add === undefined || req.body.domain_add === ''){

    req.flash('error', 'You didnt specified a domain name.');
    res.redirect('/')
  
  }else{
  
    let Message = require('./models/message');
  
  
  
    Message.create(req.body.domain_add, req.body.content_add, function () {
  
        req.flash('success', 'Domain Succesfully added.');
    
        res.redirect('/')
      })
  
  
  }
 


})


app.post('/', (req, res) => {


if(req.body.domain === undefined || req.body.domain === ''){

  req.flash('error', 'You didnt specified a domain name.');
  res.redirect('/')

}else{

  let Message = require('./models/message');



  Message.update(req.body.domain, function () {

      req.flash('success', 'Domain Succesfully added.');
  
      res.redirect('/')
    })


}



})

app.post('/:id', (req, res) => {


  if(req.body.domain === undefined || req.body.domain === ''){

    req.flash('error', 'You didnt specified a domain name.');
    res.redirect('/')
  
  }else{
  
    let Message = require('./models/message');
  
  
  
    Message.update(req.body.domain, req.body.content, req.params.id, function () {
  
        req.flash('success', 'Domain Succesfully updated.');
    
        res.redirect('/')
      })
  
  
  }
 


})



app.get('/:id/delete', (req, res) => {

  let Message = require('./models/message');

  Message.delete(req.params.id, function(){
    req.flash('success', 'Domain Succesfully deleted.');
    
    res.redirect('/')
  

  })

})


app.get('/dyndns', (req, res) => {

  GD_cron(() => {

   

  })

  res.redirect('/');

})

app.listen('3000');





//GD

const gdapikey = "";
const gdapisecret = "";

async function GDDynDns(mydomain, hostname){

    const ipv4 = await publicIp.v4();
    let GD = require('./models/gd');
    GD.add_ip(ipv4, function() {



    })
  
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
     console.log('Updated');
  })
  .catch(function (err) {
    console.log(err.message);
  });
  
  
  }

function GD_cron () {

    let GD = require('./models/gd');
    GD.all((ressources) => {

            for (ressource of ressources){
                
                console.log(ressource.domain)
                GDDynDns(ressource.domain, ressource.content);

            }
     
    
      })


}


/*cron.schedule('* * * * *', function() {

  GDDynDns(mydomain1, hostname1);

})*/
 

      

    
    