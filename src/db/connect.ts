import mongoose from "mongoose";
import config from "config";
import log from "../logger";

function connect(){
    const uri = config.get("dbConnectionUri") as string;

    return mongoose
        .connect(uri)
        .then(()=>{
            log.info("Database connected.");
        })
        .catch((error)=>{
            log.error("Database error", error);
            // Exit process
            process.exit(1);
        });
}

export default connect;