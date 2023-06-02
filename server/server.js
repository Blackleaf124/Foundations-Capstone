const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { getWeapons, getAmmo, getItems, getQuest, postSelected, deleteSelected, calculateHunt, getMoney } = require('./controller.js')

app.get("/weapons", getWeapons)
app.get("/ammo", getAmmo)
app.get("/items", getItems)
app.get("/quest", getQuest)
app.post("/selected", postSelected)
app.delete("/clearSelected", deleteSelected)
app.post("/huntResults", calculateHunt)
app.get("/currentMoney", getMoney)


app.listen(4060, () => console.log("Server running on 4060"))