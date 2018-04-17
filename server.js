//Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

//Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

//bcrypt Setup
let bycript = require('bcrypt');
const saltRounds = 10;

//login
app.post('/api/login', (req,res) => {
    if (!req.body.username || !req.body.password)
        return res.status(400).send();
    knex('users').where('username',req.body.username).first()
    .then(user => {
        if (user === undefined) {
            res.status(403).send("Invalid credentials");
            throw new Error('abort');
        }
        return [bcrypt.compare(req.body.password, user.hash),user];
    }).spread((result,user) => {
        if (result)
            res.status(200).json({user:{user_id:user.user_id, username:user.username, hash:user.hash, role:user.role}})
        else
            res.status(403).send("Invalid credentials");
        return;
        }).catch(error => {
            if (error.message !== 'abort') {
                console.log(error);
                res.status(500).json({ error });
            }
        });
});

//register user
app.post('/api/users',(req,res) => {
    if (!req.body.username || !req.body.password)
        return res.status(400).send();
    knex('users').where('username',req.body.username).first()
    .then(user => {
        if (user !== undefined) {
            res.status(403).send("Username already taken.");
            throw new Error('abort');
        }
        return bcrypt.hash(req.body.password,saltRounds);
    }).then(hash => {
        return knex('users').insert({username:req.body.username,hash:hash,role:'user'});
    }).then(ids => {
        return knex('users').where('user_id',ids[0]).first().select('user_id','username');
    }).then(user => {
        res.status(200).json({user:user});
        return;
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({error});
        }
    });
}); 




//create an activity
app.post('/api/activities', (req,res) => {
    if (!req.body.name || !req.body.link || !req.body.day || !req.body.time || !req.body.description)
        return res.status(400).send();
    knex('activities').insert({name: req.body.name, 
        link: req.body.link, dayText: req.body.dayText, time: req.body.time, 
        description: req.body.description, createdBy: req.params.user_id})
    .then(ids => {
        return knex('activities').where('id',ids[0]).first();
    }).then(activity => {
        res.status(200).json({activity:activity});
        return;
    }) 
    .catch(error => {
        console.log(error);
        res.status(500).json({error});
    });
});

//get activities
app.get('/api/activities', (req, res) => {
    knex('activities').select("*")
    .then(activities => {
        res.status(200).json({activities});
    }).catch(error => {
        console.log(error);
        res.status(500).json({error});
    });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

