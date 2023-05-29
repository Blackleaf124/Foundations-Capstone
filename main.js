
const qstBoard = document.getElementById("questBoard")
const chsnQuest = document.getElementById("chosenQuest")
const newQuestsBtn = document.getElementById("newQstBtn")
let currentQuests = []
let selectedQuest = {}

function createNewQuestCard (monsterName, imgURL, bounty, id) {
    
    const cardWrapper = document.createElement("div")
    const cardTitle = document.createElement("h3")
    const cardImage = document.createElement("img")
    const cardReward = document.createElement("p")
    const cardButton = document.createElement("button")

    cardWrapper.id = id
    cardTitle.innerHTML = monsterName
    cardImage.src = imgURL
    cardImage.classList.add("monster-image")
    cardReward.innerHTML = bounty
    cardButton.innerText = "Select"
    cardButton.id = ("selectQuestButton")
    cardButton.addEventListener("click", () => {
        if(id === "firstQuest"){
            selectedQuest = currentQuests[0]
        }else if(id === "secondQuest"){
            selectedQuest = currentQuests[1]
        }else if(id === "thirdQuest"){
            selectedQuest = currentQuests[2]
        }
        postSelectedQuest()
    })
    cardWrapper.appendChild(cardTitle)
    cardWrapper.appendChild(cardImage)
    cardWrapper.appendChild(cardReward)
    cardWrapper.appendChild(cardButton)

    qstBoard.appendChild(cardWrapper)
}

function selectQuestCard (monsterName, imgURL, bounty) {
    
    const cardWrapperSel = document.createElement("div")
    const cardTitleSel = document.createElement("h3")
    const cardImageSel = document.createElement("img")
    const cardRewardSel = document.createElement("p")
    const cardButtonSel = document.createElement("button")

    cardWrapperSel.id = "selectedQuestDiv"
    cardTitleSel.innerHTML = monsterName
    cardImageSel.src = imgURL
    cardImageSel.classList.add("monster-image")
    cardRewardSel.innerHTML = bounty
    cardButtonSel.innerText = "Remove"
    cardButtonSel.id = ("removeQuestButton")
    cardButtonSel.addEventListener("click", () => {
        cardWrapperSel.remove()
        deleteSelectedQuest()
    })
    cardWrapperSel.appendChild(cardTitleSel)
    cardWrapperSel.appendChild(cardImageSel)
    cardWrapperSel.appendChild(cardRewardSel)
    cardWrapperSel.appendChild(cardButtonSel)

    chsnQuest.appendChild(cardWrapperSel)
}


const getNewQuests = () => {
    console.log("Get new quests")
    // let qstSel = document.querySelector("#questSection")
    // if(qstSel){
    //     qstSel.remove()
    // } 

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
            selectQuestCard(res.data.monster, res.data.image, res.data.reward)
        })
        .catch()
}

const deleteSelectedQuest =() => {
    console.log("Delete selected quest");
    axios.delete("http://localhost:4060/clearSelected/")
        .then(console.log("Selected quest cleared"))
        .catch()
}


newQuestsBtn.addEventListener("click", getNewQuests)







