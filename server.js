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

//jwt setup
//source .env;
const jwt = require('jsonwebtoken');
let jwtSecret = process.env.jwtSecret;
if (jwtSecret == undefined) {
    console.log("You need to define a jwtSecret to continue.");
    knex.destroy();
    process.exit();
}

//bcrypt Setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

//verify token
const verifyToken = (req,res,next) => {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(403).send({ error: 'No token provided.' });
    jwt.verify(token,jwtSecret,function(err,decoded) {
        if(err)
            return res.status(500).send({ error: "Failed to authenicate token." });
        req.userID = decoded.id;
        next();
        });
}

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
        if (result) {
            let token = jwt.sign({id: user.id}, jwtSecret, {
                //expiresIn: 86400
            });
            res.status(200).json({user:{user_id:user.user_id, username:user.username},token:token});
        } else {
            res.status(403).send("Invalid credentials");
        }
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
        let token = jwt.sign({id:user.user_id},jwtSecret,{
            //expiresIn: 86400
        });
        res.status(200).json({user:user,token:token});
        return;
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({error});
        }
    });
}); 

//get activities
app.get('/api/activities/all', (req, res) => {
    knex('activities').select("*")
    .then(activities => {
        console.log("activities:"+activities);
        res.status(200).json({activities: activities});
    }).catch(error => {
        console.log(error);
        res.status(500).json({error});
    });
});

app.get('/api/activities/:day', (req, res) => {
    //let day = parseInt(req.params.day);
    knex('activities').select("*").where('day', req.params.day)
    .then(activities => {
        res.status(200).json({activities});
    }).catch(error => {
        console.log(error);
        res.status(500).json({error});
    });
});

//get my account
app.get('/api/me',verifyToken, (req,res) => {
    console.log("id is "+ req.userID);
    knex('users').where('user_id',req.userID).first().select('username','user_id')
    .then(user => {
        res.status(200).json({user:user});
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error });
    });
});

//create an activity
app.post('/api/activities/:user_id', verifyToken, (req,res) => {
    let user_id = parseInt(req.params.user_id)
    //console.log("1st: "+user_id);
    //console.log("2nd: "+req.userID);
    if (user_id !== req.userID)
    {
        res.status(403).send();
        return;
    }
    if (!req.body.name || !req.body.link || !req.body.day || !req.body.time || !req.body.description)
        return res.status(400).send();
    knex('activities').insert({name: req.body.name, 
        link: req.body.link, day: req.body.day, time: req.body.time, 
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

//delete activity
app.delete('/api/activities/:user_id/:id',verifyToken,(req,res) => {
    console.log("entered delete");
    let id = parseInt(req.params.id);
    let user_id = parseInt(req.params.user_id);
    console.log("1st: "+user_id);
    console.log("2nd: "+req.userID);
    if (user_id !== req.userID)
    {
        res.status(403).send();
        return;
    }
    knex('activities').where('id',id).first().del()
    .then(activity => {
        res.sendStatus(200);
        return;
    }).catch(error => {
        console.log(error);
        res.status(500).json({error});
    });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

