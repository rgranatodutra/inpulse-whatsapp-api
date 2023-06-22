import express, { json, Request, Response } from "express";
import axios from "axios";
import "dotenv/config";
import { AppDataSource } from "./data-source";
import { Client } from "./entities/clients.entity";
import 'express-async-errors';

const app = express();
app.use(json({ limit: '20mb' }));

app.post("/webhook/:empresa", async (req: Request, res: Response) => {
    try {
        if (!req.body.entry[0]?.changes[0].value?.messages) {
            return;
        } else {
            console.log(new Date().toLocaleString(), `: ${req.params.empresa} recebeu uma nova mensagem.`);

            const clientsRepo = AppDataSource.getRepository(Client);
            const client = await clientsRepo.findOneBy({ name: req.params.empresa });

            if (client) {
                try {
                    const api = axios.create({
                        baseURL: client.serverUrl,
                        timeout: 10000
                    });

                    api.post('/message', req.body)
                    .catch(err => console.log(new Date().toLocaleString(), ": Falha ao se conectar com: ", client.serverUrl))

                } catch (err) {
                    console.log(new Date().toLocaleString(), ": Falha ao se conectar com: ", client.serverUrl)
                };
                

                return res.status(200).send();
            } else {
                console.log(new Date().toLocaleString(), ": Cliente não encontrado: ", req.params.empresa)
            };

        };
    } catch (err) {
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

export default app;