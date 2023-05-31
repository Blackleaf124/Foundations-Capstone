
const qstBoard = document.getElementById("questBoard")
const infoBoard = document.getElementById("info")
const chsnQuest = document.getElementById("chosenQuest")
const newQuestsBtn = document.getElementById("newQstBtn")
let currentQuests = []
let selectedQuest = {}
let itemsList = []

function createNewQuestCard (monsterName, imgURL, bounty, id) {
    
    const cardWrapper = document.createElement("div")
    const cardTitle = document.createElement("h3")
    const cardImage = document.createElement("img")
    const cardReward = document.createElement("p")
    const cardButton = document.createElement("button")
    const infoButton = document.createElement("button")

    cardWrapper.id = id
    cardWrapper.classList.add("questCard")
    cardTitle.innerHTML = monsterName
    cardTitle.classList.add("cardTitle")
    cardImage.src = imgURL
    cardImage.classList.add("monster-image")
    cardReward.innerHTML = "Reward: $" + bounty
    cardReward.classList.add("cardReward")
    infoButton.innerText = "Info"
    infoButton.classList.add("cardButton")
    infoButton.id = ("monsterInfoButton")
    infoButton.addEventListener("click", () => {
        const infoDiv = document.createElement("div")
        const closeBtn = document.createElement("h1")
        const infoImg = document.createElement("img")
        const textDiv = document.createElement("div")
        const infoTitle = document.createElement("h2")
        const infoP = document.createElement("p")
        const lowOpacityBkgrd = document.createElement("div")

        infoDiv.id = "infoPanel"
        infoDiv.classList.add("info-panel")
        textDiv.id = "textDiv"
        infoTitle.innerHTML = monsterName
        infoP.innerHTML = "Placeholder text"
        infoP.id = "infoP"
        infoImg.src = imgURL
        infoImg.classList.add("monster-imageInfo")
        closeBtn.innerHTML = "X"
        closeBtn.id = "closeButton"
        closeBtn.addEventListener("click", () => {
            infoDiv.remove()
            lowOpacityBkgrd.remove()
        })
        lowOpacityBkgrd.id = "lowOpacityBkgrd"

        infoDiv.appendChild(closeBtn)
        infoDiv.appendChild(infoImg)
        textDiv.appendChild(infoTitle)
        textDiv.appendChild(infoP)
        infoDiv.appendChild(textDiv)

        infoBoard.appendChild(infoDiv)

        let main = document.getElementById("main")
        main.appendChild(lowOpacityBkgrd)
    })
    cardButton.innerText = "Select"
    cardButton.classList.add("cardButton")
    cardButton.id = (id + "selectBtn")
    currentBtnId = cardButton.id
    cardButton.addEventListener("click", () => {
        if(document.getElementById("stamp")){
            return
        }
        
        if(id === "firstQuest"){
            selectedQuest = currentQuests[0]
        }else if(id === "secondQuest"){
            selectedQuest = currentQuests[1]
        }else if(id === "thirdQuest"){
            selectedQuest = currentQuests[2]
        }
        const selectBtn = document.getElementById(cardButton.id)
        const removeBtn = document.createElement("button")
        removeBtn.innerText = "Remove"
        removeBtn.classList.add("rmvButton")
        removeBtn.addEventListener("click", () => {
            removeBtn.parentNode.replaceChild(selectBtn, removeBtn)
            stamp.remove()
            deleteSelectedQuest()
        })
        selectBtn.parentNode.replaceChild(removeBtn, selectBtn)

        const stamp = document.createElement("img")
        stamp.src = "monsterImages/stampPic.png"
        stamp.id = "stamp"
        stamp.style.left = Math.floor(Math.random() * (120 - 5) + 5) + "px"
        stamp.style.bottom = Math.floor(Math.random() * (300 - 80) + 80) + "px"
        stamp.style.rotate = Math.floor(Math.random() * (30 + 30) - 30) + "deg"
        cardWrapper.appendChild(stamp)
        postSelectedQuest()
    })
    cardWrapper.appendChild(cardTitle)
    cardWrapper.appendChild(cardImage)
    cardWrapper.appendChild(cardReward)
    cardWrapper.appendChild(cardButton)
    cardWrapper.appendChild(infoButton)

    qstBoard.appendChild(cardWrapper)
}

const getWeaponsArray = () => {
    console.log("Get weapons")

    axios.get("http://localhost:4060/weapons/")
        .then(res => {
            weaponsList = res.data
            let optionList = document.getElementById("weapon").options
            let options = weaponsList

            options.forEach(option => optionList.add(
                new Option(option.name, option.attributes)
            ))
        })
}

const getAmmoArray = () => {
    console.log("Get ammo")

    axios.get("http://localhost:4060/ammo/")
        .then(res => {
            ammoList = res.data
            let optionList = document.getElementById("ammo").options
            let options = ammoList

            options.forEach(option => optionList.add(
                new Option(option.name, option.attributes)
            ))
        })
}

const getItemsArray = () => {
    console.log("Get items")

    axios.get("http://localhost:4060/items/")
        .then(res => {
            itemsList = res.data
            let optionList = document.getElementById("gear").options
            let options = itemsList

            options.forEach(option => optionList.add(
                new Option(option.name, option.attributes)
            ))
        })
}

const getNewQuests = () => {
    console.log("Get new quests")
    deleteSelectedQuest()
    document.querySelector("#firstQuest")?.remove()
    document.querySelector("#secondQuest")?.remove()
    document.querySelector("#thirdQuest")?.remove()
    
    axios.get("http://localhost:4060/quest/")
        .then(res => {
            currentQuests = res.data
            createNewQuestCard(res.data[0].monster, res.data[0].image, res.data[0].reward, "firstQuest")
            createNewQuestCard(res.data[1].monster, res.data[1].image, res.data[1].reward, "secondQuest")
            createNewQuestCard(res.data[2].monster, res.data[2].image, res.data[2].reward, "thirdQuest")
        })
}

const refreshQuests = () => {
    console.log("Get new quests")
    deleteSelectedQuest()

}

const postSelectedQuest = () => {
    console.log("Post new quest")

    let myBody = selectedQuest

    axios.post("http://localhost:4060/selected/", myBody)
        .then(res => {
            console.log(selectedQuest);
        })
        .catch()
}

const deleteSelectedQuest = () => {
    console.log("Delete selected quest");
    axios.delete("http://localhost:4060/clearSelected/")
        .then(res => {
            selectedQuest = {}
            console.log("Selected quest cleared")
        })
        .catch()
}

const beginHunt = (event) => {
    event.preventDefault()
    // if(selectedQuest === {}){

    // }
    let selectedWeapon = document.getElementById("weapon")
    let weaponAttribute = selectedWeapon.options[selectedWeapon.selectedIndex].value
    let selectedAmmo = document.getElementById("ammo")
    let ammoAttribute = selectedAmmo.options[selectedAmmo.selectedIndex].value
    let selectedGear = document.getElementById("gear")
    let gearAttribute = selectedGear.options[selectedGear.selectedIndex].value
    let monsterWeaknesses = selectedQuest.weak
    let monsterBuild = selectedQuest.build
    
    console.log(selectedQuest);

    huntParams = {
        "monsterWeak": monsterWeaknesses,
        "monsterBuild": monsterBuild,
        "weaponAttribute": weaponAttribute,
        "ammoAttribute": ammoAttribute,
        "gearAttribute": gearAttribute
    }
    
    axios.post("http://localhost:4060/huntResults/", huntParams)
        .then(res => {
            document.querySelector("#resultP")?.remove()
            // selectedQuestDiv.remove()
            deleteSelectedQuest()
            getNewQuests()
            let result = document.createElement("p")
            result.innerHTML = res.data
            result.id = "resultP"
            resultSection.appendChild(result)
            console.log(res.data)
        })
        .catch(error => {
            document.querySelector("#resultP")?.remove()
            let result = document.createElement("p")
            result.innerHTML = "You must select a quest in order to embark"
            result.id = "resultP"
            resultSection.appendChild(result)
        })
}


getNewQuests()
getWeaponsArray()
getAmmoArray()
getItemsArray()

newQuestsBtn.addEventListener("click", getNewQuests)
hunterGearForm.addEventListener("submit", beginHunt)







