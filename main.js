
const qstBoard = document.getElementById("questBoard")
const newQuestsBtn = document.getElementById("newQstBtn")

//Create new function that creates card for quest. It will take in one quest object.
//Create parent element.
//Create a new element for each piece of data for that quest that I want to display.
//Append new elements to the parents element.
//Return parent element.

const getNewQuests = () => {
    console.log("Hey");
    axios.get("http://localhost:4060/quest/")
            .then(res => {
                console.log(res.data);
                //Select parent element (quest board).
                //loop through array and create quest card for each quest.
                //Append the invoked function to the quest board.
            })
}   

newQuestsBtn.addEventListener("click", getNewQuests)




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
    cardWrapper.appendChild(cardTitle)
    cardWrapper.appendChild(cardImage)
    cardWrapper.appendChild(cardReward)

    qstBoard.appendChild(cardWrapper)
}

instantDomManipulation("Jared", "https://static01.nyt.com/images/2022/12/20/science/16tb-cinnamon-bear/16tb-cinnamon-bear-mediumSquareAt3X.jpg", 35)