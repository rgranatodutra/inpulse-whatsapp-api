import express, { Application, Request, Response, json } from "express";
import axios from "axios";
import 'dotenv/config';

const app: Application = express();
app.use(json({ limit: '20mb' }));

app.post("/api/wp/webhook", (req: Request, res: Response) => {
    try {
        let number = req.body.entry[0].changes[0].value.messages[0].from; 
        console.log("aqui 2")
        
        const baseURL = process.env.INFOTEC_BASEURL || "http://localhost:8000";
        const api = axios.create({
            baseURL: baseURL,
            timeout: 10000
        });

        console.log(new Date().toLocaleString(), ": New message from ", number, "to infoTec.")
        api.post('/api/whatsapp/', req.body);
    
        return res.status(200).send();
    } catch(err){
        console.log(err);
    };
});

app.get("/api/wp/webhook", (req: Request, res: Response) => {
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

app.listen(3003, () => {
    console.log(new Date().toLocaleString(), `: App is running on http://localhost:3003`);
});