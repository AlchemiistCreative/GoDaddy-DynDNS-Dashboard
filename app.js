const rp = require('request-promise')
const publicIp = require('public-ip');
const cron = require('node-cron');
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
var scheduler = require('node-schedule');



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

  Message.all((mains) => {

    let GD = require('./models/gd');

    GD.get_config((configs) => {

      res.render('index', {mains: mains, configs: configs});


    })

  })

  let Default_ = require('./config/default_table_entry')

  Default_();



})


app.post('/dyndns', (req, res) => {
  let GD = require('./models/gd');
  let schedule = req.body.schedule

  GD.add_schedule(schedule, () => {

    GD_cron();

  })

  publicIP();

  res.redirect('/');

})

app.post('/setcred', (req, res) => {
  let GD = require('./models/gd');
  let apikey = req.body.apikey
  let secretkey = req.body.secretkey
  GD.add_credentials(apikey, secretkey, () => {

   

  })
  req.flash('success', 'API added.');

  res.redirect('/');

})

// app.post('/schedule', (req, res) => {
//   let GD = require('./models/gd');
//   let schedule = req.body.schedule
 
//   GD.add_schedule(schedule, () => {

//   })

//   res.redirect('/');

// })

app.post('/add', (req, res) => {
  console.log('add');

  if(req.body.domain_add === undefined || req.body.domain_add === ''){

    req.flash('error', 'You didnt specified a domain name.');
    res.redirect('/')
  
  }else{
  
    let Message = require('./models/message');

    Message.create(req.body.domain_add, req.body.content_add, req.body.type_add, function () {
  
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
  
  
  
    Message.update(req.body.domain, req.body.content,req.body.type, req.params.id, function () {
  
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

app.listen('3000');

//GD

async function publicIP(){

  const ipv4 = await publicIp.v4();
  let GD = require('./models/gd');
  
  GD.update_ip(ipv4, function() {


  })

}

function GDDynDns(mydomain,type,hostname,ipv4, apikey, secretkey){


  
    const data = 	[
      {
        "data": `${ipv4}`,
        "port": 1,
        "priority": 1,
        "ttl": 600,
        "weight": 0
      }
    ]
  
    
  
  
    var options = {
      method: 'PUT',
      url: `https://api.godaddy.com/v1/domains/${mydomain}/records/${type}/${hostname}`,
      headers: {
        'Authorization': `sso-key ${apikey}:${secretkey}`,
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
  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }




function GD_cron () {

    let GD = require('./models/gd');
    
      GD.get_config((ressources) => {
              for (ressource of ressources){

                GD.all((mains) => {

                  for (main of mains){

                    var time_ = convertTime12to24(ressource.schedule);
            
                    var time = time_.split ( ":" );
          
 
                    var hours = time[0];
                    var minutes = time[1];
                 
                    GDDynDns(main.domain, main.types, main.content, ressource.ip,ressource.apikey, ressource.secretkey);
 
                     var rule = new scheduler.RecurrenceRule();
                     rule.hour = hours;
                     rule.minute = minutes;
                     
                     var j = scheduler.scheduleJob(rule, function(){
                       GDDynDns(main.domain, main.types, main.content,ressource.ip,ressource.apikey, ressource.secretkey);
                       console.log('Updated');
                     });
 
                   }
            
                })

              }

      })
}



 

      

    
    