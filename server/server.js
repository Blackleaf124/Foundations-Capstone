const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { getQuest, postSelected, deleteSelected } = require('./controller.js')

app.get("/quest", getQuest);
app.post("/selected", postSelected)
app.delete("/clearSelected", deleteSelected)


app.listen(4060, () => console.log("Server running on 4060"));