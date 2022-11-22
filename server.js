const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req,res) =>{
    res.json(database.users);
})

app.post('/signin', (req, res) => {

    // Load hash from your password DB.
    bcrypt.compare("apples", '$2a$10$SQ7941KHrEgJ8CzJq95F5.rkq6Dliw0tLBtFX7ILqCU2JiPgWSVBG', function(err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", '$2a$10$SQ7941KHrEgJ8CzJq95F5.rkq6Dliw0tLBtFX7ILqCU2JiPgWSVBG', function(err, res) {
        console.log('second guess', res);
    });

    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }else{
        res.status(400).json('error logging in');
    }
    res.json('signing');
});

app.post('/register', (req,res) => {
    const {email,name,password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date() 
    });
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    database.users.forEach(user => {
        if(user.id === id){
            return res.json(user);
        }
    });
    return res.status(404).json('no such user');
});

app.put('/image', (req,res) => {
    const {id} = req.body;
    database.users.forEach(user => {
        if(user.id === id){
            user.entries++;
            return res.json(user.entries);
        }
    });
    return res.status(404).json('no such user');
});






app.listen(3000, () => {
    console.log("App is running on port 3000");
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/