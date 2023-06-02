let { monsters, weapons, ammo, items } = require("../data.json")

let selectedQuest = {}

let cashMoney = "1000"

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
    getMoney: (req, res) => {
        res.status(200).send(cashMoney)
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
        let num = Math.floor(Math.random() * 101)

        let weaponResult = "The weapon the hunter had wasn't particularly effective against the beast."
        let ammoResult = "The Hunter's ammunition didn't seem to have any noticable effect during the hunt."
        let gearResult = "The additional tools provided the hunter weren't found to be very useful in the fight and served little purpose."
        let fateOfHunter = "Something went wrong on the server dawg."

        if(build === weapon){
            bonus += 10
            if(weapon === "normal"){
                weaponResult = "The lever-action allowed the hunter a good mix of stopping power and speed during the fight."
            }else if(weapon === "light"){
                weaponResult = "The revolvers were the perfect choice to help the hunter keep up with the target's speed and agility."
            }else if(weapon === "heavy"){
                weaponResult = "The shotgun had incredible stopping power and allowed the hunter to deal significant damage to the armoured prey."
            }
        }
        for(i=0; i<weak.length; i++){
            if(weak[i] === ammo && weak[i] === gear){
                bonus += 20
                ammoResult = "The ammunition given the hunter was very effective against the beast and gave them an edge during the fight."
                gearResult = "The additional tools the hunter had at their disposal aided the hunt substantially."
            }else if(weak[i] === ammo){
                bonus += 10
                ammoResult = "The ammunition given the hunter was very effective against the beast and gave them an edge."
            }else if(weak[i] === gear){
                bonus += 10
                gearResult = "The additional tools the hunter had at their disposal aided the hunt substantially."
            }
        }
        let num2 = num + bonus
        console.log("Bonus: " + bonus);
        if(num2 < 40){
          if(bonus >= 30){
                fateOfHunter = "Despite their powerful loadout and optimized gear, the beast somehow found an opening and managed to slay the hunter."
            }else if(bonus === 10 || bonus === 20){
                fateOfHunter = "The battle was close, but the hunter's equipment wasn't right for the hunt and they eventually were overpowered and killed."
            }else if(bonus === 0){
                fateOfHunter = "The hunter's equipment wasn't anywhere close to what they needed to complete the hunt and they were swiftly and surgically taken down."
            }  
            res.status(200).send(`${weaponResult} ${ammoResult} ${gearResult} ${fateOfHunter} The quest ended in failure...`)
        }else{
            if(bonus === 30){
                fateOfHunter = "The fight was over in a matter of seconds as the hunter deployed a near flawless strategy to put their target down and complete the contract."
            }else if(bonus === 10 || bonus === 20){
                fateOfHunter = "The hunter's kit wasn't perfect, but they had enough tricks up their sleeve to finish off the beast."
            }else if(bonus === 0){
                fateOfHunter = "With virtually nothing in their loadout that was particularly effective against their prey, it's a miracle they managed to get the kill."
            }
            res.status(200).send(res.status(200).send(`${weaponResult} ${ammoResult} ${gearResult} ${fateOfHunter} The quest was a success!`))
        }
        
    }
}