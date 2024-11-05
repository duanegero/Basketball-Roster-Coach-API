const express = require('express'); //importing express module from npm
const cors = require('cors'); //importing cors module from npm
const app = express(); //setting up variable to handle express
const PORT = process.env.PORT || 3000; //setting port number for server

const teamOneRoutes = require('./routes/teamOne'); //importing team one route
const teamTwoRoutes = require('./routes/teamTwo');
const teamThreeRoutes = require('./routes/teamThree');

const coachMasterRoutes = require('./routes/coachMaster');

const loginRoute = require('./routes/login');

app.use(express.json()); //middleware to parse and handle json

app.use(cors()); //enable cors for all routes

app.use('/team1', teamOneRoutes);
app.use('/team2', teamTwoRoutes);
app.use('/team3', teamThreeRoutes);

app.use('/coaches', coachMasterRoutes);

app.use('/login', loginRoute);

app.get('/', (req, res) => {
    res.send('Welcome to Duane API!')
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
