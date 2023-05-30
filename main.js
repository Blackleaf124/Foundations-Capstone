
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
        const infoImg = document.createElement("img")
        const infoTitle = document.createElement("h2")
        const infoP = document.createElement("p")
        const closeBtn = document.createElement("button")

        infoDiv.id = "infoPanel"
        infoDiv.classList.add("info-panel")
        infoTitle.innerHTML = monsterName
        infoP.innerHTML = "Placeholder text"
        infoImg.src = imgURL
        infoImg.classList.add("monster-image")
        closeBtn.innerText = "Close"
        closeBtn.id = "closeButton"
        closeBtn.addEventListener("click", () => {
            infoDiv.remove()
        })

        infoDiv.appendChild(infoTitle)
        infoDiv.appendChild(infoImg)
        infoDiv.appendChild(closeBtn)
        infoDiv.appendChild(infoP)

        infoBoard.appendChild(infoDiv)
    })
    cardButton.innerText = "Select"
    cardButton.classList.add("cardButton")
    cardButton.id = (id + "selectBtn")
    currentBtnId = cardButton.id
    cardButton.addEventListener("click", () => {
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
            deleteSelectedQuest()
        })
        selectBtn.parentNode.replaceChild(removeBtn, selectBtn)
        console.log(selectedQuest);
        postSelectedQuest()
    })
    cardWrapper.appendChild(cardTitle)
    cardWrapper.appendChild(cardImage)
    cardWrapper.appendChild(cardReward)
    cardWrapper.appendChild(cardButton)
    cardWrapper.appendChild(infoButton)

    qstBoard.appendChild(cardWrapper)
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

const postSelectedQuest = () => {
    console.log("Post new quest")

    let myBody = selectedQuest

    axios.post("http://localhost:4060/selected/", myBody)
        .then(res => {
            
        })
        .catch()
}

const deleteSelectedQuest = () => {
    console.log("Delete selected quest");
    axios.delete("http://localhost:4060/clearSelected/")
        .then(console.log("Selected quest cleared"))
        .catch()
}

const beginHunt = (event) => {
    event.preventDefault()
    let selectedOption = document.getElementById("gear")
    let gearAttribute = selectedOption.options[selectedOption.selectedIndex].value
    let monsterWeaknesses = selectedQuest.weak
    

    huntParams = {
        "monsterWeak": monsterWeaknesses,
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
}


getNewQuests()
getItemsArray()

newQuestsBtn.addEventListener("click", getNewQuests)
hunterGearForm.addEventListener("submit", beginHunt)







