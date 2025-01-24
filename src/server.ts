import { connect } from "mongoose";
import { Server } from "http"
import app from "./app";
import config from "./app/config";

let server: Server;

async function run() {
    // 4. Connect to MongoDB
    try {
        await connect(config.dataBase_url as string);
        server = app.listen(config.port, () => {
            console.log(`app is listening on port ${config.port}`);
        });

    } catch (error) {
        console.log(error)
    }
}
run()


process.on('unhandledRejection', (err) => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});