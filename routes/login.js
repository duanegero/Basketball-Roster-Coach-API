const express = require('express') //importing express from npm
const router = express.Router(); //creating a router variable to handle the route
const jwt = require('jsonwebtoken'); //importing jwt from npm

const myKey = "my_secret_key"; //varible to handel my api key 

//sample users array with objects 
const users = [
    { username: 'admin', password: 'password123' },
    { username: 'testuser', password: 'password' },
    { username: 'superuser', password: 'password000' },
    { username: 'user', password: 'password111' },
    { username: 'user2', password: 'password' },
    { username: 'user3', password: 'password@' }
]

router.post('/', (req, res) => {
    const { username, password } = req.body
    const user = users.find((u) => u.username === username && u.password === password)

    if (!user) {
        //if username or password incorrect
        res.status(401).json({ message: 'Wrong username or password' })
    }

    const payload = { username }; //the info that will be embedded in the JWT
    console.log(payload);

    const token = jwt.sign(payload, myKey) //sign jwt with payload and key
    console.log(token);

    res.json({ token }) //send the token to the client

})
//exporting the router
module.exports = router;