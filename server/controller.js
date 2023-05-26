const monsters = [
    {
        "name": "Beak Face",
        "weaknesses": ["burning", "stun"],
        "family": "carnal",
        "build": "light"
    },
    {
        "name": "Hammer-head",
        "weaknesses": ["concussion", "holy"],
        "family": "eldritch",
        "build": "heavy"
    },
    {
        "name": "Book-head Face Hider",
        "weaknesses": ["mental", "poison"],
        "family": "abyssal",
        "build": "normal"
    },
    {
        "name": "Snake Zerg",
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

module.exports = {
    
    getQuest: (req, res) => {
        let randomIndex = Math.floor(Math.random() * monsters.length)
        let randomMonster = monsters[randomIndex]

        let newQuest = {
            "monster": "",
            "reward": 0  
        }

        newQuest.monster = randomMonster.name
        newQuest.reward = Math.floor(Math.random() * (800 - 500)) + 500

        console.log(newQuest);

        res.status(200).send(newQuest)
    }
}