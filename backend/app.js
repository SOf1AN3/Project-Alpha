const express = require("express");
const mongoose = require("mongoose");

const app = express();

const dbURI = "mongodb://localhost:27017/Project-Alpha";

app.get("/", (req, res) => {
     res.redirect("/products");
});

