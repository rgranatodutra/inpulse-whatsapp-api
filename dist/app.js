"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const data_source_1 = require("./data-source");
const clients_entity_1 = require("./entities/clients.entity");
require("express-async-errors");
const app = (0, express_1.default)();
app.use((0, express_1.json)({ limit: '20mb' }));
app.post("/webhook/:empresa", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_b = (_a = req.body.entry[0]) === null || _a === void 0 ? void 0 : _a.changes[0].value) === null || _b === void 0 ? void 0 : _b.messages)) {
            return;
        }
        else {
            console.log(new Date().toLocaleString(), `: ${req.params.empresa} recebeu uma nova mensagem.`);
            const clientsRepo = data_source_1.AppDataSource.getRepository(clients_entity_1.Client);
            const client = yield clientsRepo.findOneBy({ name: req.params.empresa });
            if (client) {
                try {
                    const api = axios_1.default.create({
                        baseURL: client.serverUrl,
                        timeout: 10000
                    });
                    api.post('/whatsapp/message', req.body)
                        .catch(err => console.log("err"));
                }
                catch (err) {
                    console.log(new Date().toLocaleString(), ": Falha ao se conectar com: ", client.serverUrl);
                }
                ;
                return res.status(200).send();
            }
            else {
                console.log(new Date().toLocaleString(), ": Cliente não encontrado: ", req.params.empresa);
            }
            ;
        }
        ;
    }
    catch (err) {
        console.log(err);
    }
    ;
}));
app.get("/webhook/:empresa", (req, res) => {
    const verify_token = "inpulse";
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (mode && token) {
        if (mode === "subscribe" && token === verify_token) {
            res.status(200).send(challenge);
        }
        else {
            res.status(403).send();
        }
        ;
    }
    ;
});
exports.default = app;
