import app from "./app";
import { AppDataSource } from "./data-source";

async function initialize() {
    
    await AppDataSource.initialize()
    console.log(new Date().toLocaleString(), ': Database connected.');

    app.listen(4433, () => {
        console.log(new Date().toLocaleString(), ": App initialized on port 4433.")
    });
};

initialize();