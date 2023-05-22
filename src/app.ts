import express, { json, Request, Response } from "express";
import axios from "axios";
import "dotenv/config";
import { AppDataSource } from "./data-source";
import { Client } from "./entities/clients.entity";

const app = express();
app.use(json({ limit: '20mb' }));

app.post("/webhook/:empresa", async(req: Request, res: Response) => {
    try {
        if(!req.body.entry[0]?.changes[0].value?.messages) {
            return;
        } else {
            console.log(new Date().toLocaleString(), `: ${req.params.empresa} recebeu uma nova mensagem.`);

            const clientsRepo = AppDataSource.getRepository(Client);
            const client = await clientsRepo.findOneBy({ name: req.params.empresa });

            if(client) {
                const api = axios.create({
                    baseURL: client.serverUrl,
                    timeout: 10000
                });
        
                api.post('/whatsapp/message', req.body);
            
                return res.status(200).send();
            } else {
                return res.status(404).json({ message: "Client not found..." })
            };

        };
    } catch(err){
        console.log(err);
    };
});

app.get("/webhook/:empresa", (req: Request, res: Response) => {
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