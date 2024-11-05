const express = require('express')
const router = express.Router();

let coachMaster = [
    {id: 1, first_name: 'coach1', team: 'teamOne', assistant_coach: 'assistant1'},
    {id: 2, first_name: 'coach2', team: 'teamTwo', assistant_coach: 'assistant2'},
    {id: 3, first_name: 'coach3', team: 'teamThree', assistant_coach: 'assistant3'},
    {id: 4, first_name: 'coach4', team: 'teamFour', assistant_coach: 'assistant4'},
    {id: 5, first_name: 'coach5', team: 'teamFive', assistant_coach: 'assistant5'},
    {id: 6, first_name: 'coach6', team: 'teamSix', assistant_coach: 'assistant6'},
]

router.get('/', (req, res) => {
    res.json(coachMaster)
})

router.get('/:id', (req, res) => {
    const coachId = parseInt(req.params.id);
    const coach = coachMaster.find((c) => c.id === coachId)

    if(coach) res.json(coach);
    else res.status(404).send('Coach Not Found')
})

router.post('/', (req, res) => {
    const newCoach = { id: coachMaster.length + 1, ...req.body }; //creating new varibale object with new coach info
    coachMaster.push(newCoach); //adding new coach to team one array
    res.status(201).json(newCoach) //sending status 
})

router.put('/:id', (req, res) => {
    const coachId = parseInt(req.params.id)
    const coachIndex = coachMaster.findIndex((c) => c.id === coachId)
    if(coachIndex !== -1){
        coachMaster[coachIndex] = {id:coachId, ...req.body}
        res.json(coachMaster[coachIndex])
    }
    else res.status(404).send('Coach Not Found')
})

router.delete("/:id", (req, res) => {
    coachMaster = coachMaster.filter((c) => c.id !== parseInt(req.params.id)); 
    res.status(204).send();
});

module.exports = router;

