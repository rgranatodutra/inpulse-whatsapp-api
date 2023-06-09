const express = require("express")
const json = require("express").json;
const axios = require("axios");
require('dotenv/config')

const app = express();
app.use(json({ limit: '20mb' }));

// Infotec Routes
app.post("/webhook/infotec", (req, res) => {
    try {
        if(!req.body.entry[0]?.changes[0].value?.messages) {
         /*             
            if(req.body.entry[0]?.changes[0]?.value?.statuses) {
                console.log(new Date().toLocaleString(), ": Message status updated. ", req.body.entry[0]?.changes[0]?.value?.statuses[0]?.status);
            } 
        */
            return;
        } else {
            console.log(new Date().toLocaleString(), ": Received new message.");
            const baseURL = process.env.INFOTEC_BASEURL || "http://localhost:8000";
            const api = axios.create({
                baseURL: baseURL,
                timeout: 10000
            });
    
            api.post('/whatsapp/message', req.body);
        
            return res.status(200).send();
        };
    } catch(err){
        console.log(err);
    };
});

app.get("/webhook/infotec", (req, res) => {
    const verify_token = "inpulse";

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === verify_token) {
            res.status(200).send(challenge);
        } else {
            res.status(403).send();
        };
    };
});

// Renan Routes
app.post("/webhook/renan", (req, res) => {
    try {
        if(!req.body.entry[0]?.changes[0].value?.messages) {
        /*             
            if(req.body.entry[0]?.changes[0]?.value?.statuses) {
                console.log(new Date().toLocaleString(), ": Message status updated. ", req.body.entry[0]?.changes[0]?.value?.statuses[0]?.status);
            } 
        */
            return;
        } else {
            console.log(new Date().toLocaleString(), ": Received new message.");

            const baseURL = process.env.RENAN_BASEURL || "http://localhost:8000";
            const api = axios.create({
                baseURL: baseURL,
                timeout: 10000
            });
    
            api.post('/whatsapp/message', req.body);
        
            return res.status(200).send();
        };
    } catch(err){
        console.log(err);
    };
});

app.get("/webhook/renan", (req, res) => {
    const verify_token = "inpulse";

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === verify_token) {
            res.status(200).send(challenge);
        } else {
            res.status(403).send();
        };
    };
});

// Junio Routes
app.post("/webhook/junio", (req, res) => {
    try {
        if(!req.body.entry[0]?.changes[0].value?.messages) {

            return;
        } else {
            console.log(new Date().toLocaleString(), ": Received new message.");

            const baseURL = process.env.JUNIO_BASEURL || "http://localhost:8000";
            const api = axios.create({
                baseURL: baseURL,
                timeout: 10000
            });
    
            api.post('/whatsapp/message', req.body);
        
            return res.status(200).send();
        };
    } catch(err){
        console.log(err);
    };
});

app.get("/webhook/junio", (req, res) => {
    const verify_token = "inpulse";

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === verify_token) {
            res.status(200).send(challenge);
        } else {
            res.status(403).send();
        };
    };
});

app.post("/webhook/premium", (req, res) => {
    try {
        if(!req.body.entry[0]?.changes[0].value?.messages) {

            return;
        } else {
            console.log(new Date().toLocaleString(), ": Received new message.");

            const baseURL = process.env.PREMIUM_BASEURL || "http://localhost:8000";
            const api = axios.create({
                baseURL: baseURL,
                timeout: 10000
            });
    
            api.post('/whatsapp/message', req.body);
        
            return res.status(200).send();
        };
    } catch(err){
        console.log(err);
    };
});

app.get("/webhook/premium",(req, res) => {
    const verify_token = "inpulse";

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === verify_token) {
            res.status(200).send(challenge);
        } else {
            res.status(403).send();
        };
    };
});

app.listen(7000, () => {
    console.log(new Date().toLocaleString(), `: App is running on http://localhost:7000`);
});