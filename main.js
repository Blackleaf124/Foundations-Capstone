
const qstBoard = document.getElementById("questBoard")
const newQuestsBtn = document.getElementById("newQstBtn")

function instantDomManipulation (monsterName, imgURL, bounty) {
    const cardWrapper = document.createElement("div")
    const cardTitle = document.createElement("h3")
    const cardImage = document.createElement("img")
    const cardReward = document.createElement("p")
    const cardButton = document.createElement("button")

    cardTitle.innerHTML = monsterName
    cardImage.src = imgURL
    cardImage.classList.add("monster-image")
    cardReward.innerHTML = bounty
    cardButton.innerText = "Embark!"
    cardWrapper.appendChild(cardTitle)
    cardWrapper.appendChild(cardImage)
    cardWrapper.appendChild(cardReward)
    cardWrapper.appendChild(cardButton)

    qstBoard.appendChild(cardWrapper)
}

const getNewQuests = () => {
    console.log("Hey");
    axios.get("http://localhost:4060/quest/")
            .then(res => {
                console.log(res.data);
                instantDomManipulation(res.data.monster, res.data.image, res.data.reward)
            })
}   

newQuestsBtn.addEventListener("click", getNewQuests)






