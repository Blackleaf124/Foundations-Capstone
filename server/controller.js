let { monsters, weapons, ammo, items } = require("../data.json")

let selectedQuest = {}

module.exports = {
    
    getWeapons: (req, res) => {
        let weaponList = weapons
        res.status(200).send(weaponList)
    },
    getAmmo: (req, res) => {
        let ammoList = ammo
        res.status(200).send(ammoList)
    },
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
             "build": "",
             "image": "",
             "description": "",
             "reward": 0  
            }
            newQuest.monster = randomMonster.name
            newQuest.weak = randomMonster.weaknesses
            newQuest.build = randomMonster.build
            newQuest.image = randomMonster.image
            newQuest.description = randomMonster.description
            newQuest.reward = Math.floor(Math.random() * (800 - 500)) + 500
            
            newQuests.push(newQuest)
        }
        res.status(200).send(newQuests)
    },
    postSelected: (req, res) => {
        // console.log(req.body);
        selectedQuest = req.body
        console.log(selectedQuest);
        res.status(200).send(selectedQuest)
    },
    deleteSelected: (req, res) => {
        selectedQuest = {}
        res.status(200).send("Selected Quest Cleared!")
    },
    calculateHunt: (req, res) => {
        let weak = req.body.monsterWeak
        let build = req.body.monsterBuild
        let weapon = req.body.weaponAttribute
        let ammo = req.body.ammoAttribute
        let gear = req.body.gearAttribute
        console.log(selectedQuest);
        if(selectedQuest === {}){
            res.status(200).send("No Quest Selected!")
        }
        
        let bonus = 0
        let num = Math.random()

        if(build === weapon){
            bonus += 0.1
        }
        for(i=0; i<weak.length; i++){
            if(weak[i] === ammo && weak[i] === gear){
                bonus += 0.2
            }else if(weak[i] === ammo || weak[i] === gear){
                bonus += 0.1
            }
        }
        let num2 = num + bonus
        if(num2 < .4){
            res.status(200).send("Quest failed...")
        }else{
            res.status(200).send("Quest successful!")
        }
        
    }
}