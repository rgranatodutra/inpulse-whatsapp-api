import express, { Application, Request, Response, json } from "express";
import 'dotenv/config';
import { infotecRouter } from "./routes/infotec.routes";


const app: Application = express();
app.use(json({ limit: '20mb' }));

app.use(infotecRouter);

app.listen(7000, () => {
    console.log(new Date().toLocaleString(), `: App is running on http://localhost:7000`);
});