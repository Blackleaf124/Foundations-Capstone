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
    },
    {
        "name": "Bug Demon",
        "image": "/monsterImages/shyishBug.jpg",
        "weaknesses": ["holy", "concussion"],
        "family": "eldritch",
        "build": "heavy"
    },
    {
        "name": "Cosmic Monk",
        "image": "/monsterImages/krissKrossKillYourFamily.jpg",
        "weaknesses": ["poison", "mental"],
        "family": "abyssal",
        "build": "light"
    }
]
const items = [
    {
        "name": "Mental Resolve Serum",
        "attributes": "mental"
    },
    {
        "name": "Poison Gas Grenades",
        "attributes": "poison"
    },
    {
        "name": "Flash Bombs",
        "attributes": "stun"
    },
    {
        "name": "Bola",
        "attributes": "stun"
    },
    {
        "name": "Golden Crucifix",
        "attributes": "holy"
    },
    {
        "name": "Sound Bomb",
        "attributes": "concussion"
    },
]

let selectedQuest = {}

module.exports = {
    
    getItems: (req, res) => {
        let itemsList = items
        res.status(200).send(itemsList)
    },
    getQuest: (req, res) => {
        let newQuests = []
        
        for(i=0; i<3; i++){
            let randomIndex = Math.floor(Math.random() * monsters.length)
            let randomMonster = monsters[randomIndex]

            let newQuest = {
             "monster": "",
             "weak": [],
             "image": "",
             "reward": 0  
            }
            newQuest.monster = randomMonster.name
            newQuest.weak = randomMonster.weaknesses
            newQuest.image = randomMonster.image
            newQuest.reward = Math.floor(Math.random() * (800 - 500)) + 500
            
            newQuests.push(newQuest)
        }
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
    },
    calculateHunt: (req, res) => {
        let weak = req.body.monsterWeak
        let attribute = req.body.gearAttribute
        // console.log(type)
        // console.log(attribute)
        let bonus = 0
        for(i=0; i<weak.length; i++){
            if(weak[i] === attribute){
                bonus + 0.2
            }
        }
        let num = Math.random() + bonus
        if(num < .4){
            res.status(200).send("Quest failed...")
        }else{
            res.status(200).send("Quest successful!")
        }
        
    }
}