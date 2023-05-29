const monsters = [
    {
        "name": "Beak Face",
        "image": "/monsterImages/beakBoy.jpg",
        "weaknesses": ["burning", "stun"],
        "family": "carnal",
        "build": "light"
    },
    {
        "name": "Hammer-head",
        "image": "/monsterImages/hammerHead.jpg",
        "weaknesses": ["concussion", "holy"],
        "family": "eldritch",
        "build": "heavy"
    },
    {
        "name": "Book-head Face Hider",
        "image": "/monsterImages/bookHead.jpg",
        "weaknesses": ["mental", "poison"],
        "family": "abyssal",
        "build": "normal"
    },
    {
        "name": "Snake Zerg",
        "image": "/monsterImages/snakeBoy.jpg",
        "weaknesses": ["burning", "stun"],
        "family": "carnal",
        "build": "heavy"
    }
]
const items = [
    {
        "name": "Mental Resolve Serum",
        "attributes": "mental",
        "cost": 100
    },
    {
        "name": "Poison Gas Grenades",
        "attributes": "poison",
        "cost": 50
    },
    {
        "name": "Flash Bombs",
        "attributes": "stun",
        "cost": 25
    },
    {
        "name": "Bola",
        "attributes": "stun",
        "cost": 40
    },
    {
        "name": "Golden Crucifix",
        "attributes": "holy",
        "cost": 90
    },
    {
        "name": "Sound Bomb",
        "attributes": "concussion",
        "cost": 30
    },
]

let selectedQuest = {}

module.exports = {
    
    getQuest: (req, res) => {
        let newQuests = []
        
        for(i=0; i<3; i++){
            let randomIndex = Math.floor(Math.random() * monsters.length)
            let randomMonster = monsters[randomIndex]

            let newQuest = {
             "monster": "",
             "image": "",
             "reward": 0  
            }
            newQuest.monster = randomMonster.name
            newQuest.image = randomMonster.image
            newQuest.reward = Math.floor(Math.random() * (800 - 500)) + 500
            
            newQuests.push(newQuest)
        }
        console.log(newQuests);

        res.status(200).send(newQuests)
    },
    postSelected: (req, res) => {
        console.log(req.body);
        selectedQuest = req.body
        res.status(200).send(selectedQuest)
    },
    deleteSelected: (req, res) => {
        selectedQuest = {}
        res.status(200).send("Selected Quest Cleared!")
    }
}