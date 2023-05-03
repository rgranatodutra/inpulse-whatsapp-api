import { Request, Response, Router } from "express";
import axios from "axios";

export const infotecRouter = Router();

infotecRouter.post('/wp/webhook', (req: Request, res: Response) => {
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