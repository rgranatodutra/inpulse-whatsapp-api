import app from "./app";
import { AppDataSource } from "./data-source";

async function initialize() {
    
    await AppDataSource.initialize()
    console.log(new Date().toLocaleString(), ': Database connected.');

    app.listen(80, () => {
        console.log(new Date().toLocaleString(), ": App initialized on port 80.")
    });
};

initialize();