const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const emailsRoutes = require("./routes/contactform");




const app = express();
mongoose.connect("mongodb+srv://william:lDseTEpkqooTNzy9@cluster0-wshfc.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed !!')
    })
// lDseTEpkqooTNzy9 (pass db william)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname,"leoslocksmithstack")));



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
        );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        )

    next();
});


app.use("/api/emails", emailsRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname,"leoslocksmithstack","index.html"));
})

module.exports = app;


