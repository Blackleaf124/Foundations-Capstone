const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { getQuest } = require('./controller.js')

app.get("/quest", getQuest);




app.listen(4060, () => console.log("Server running on 4060"));