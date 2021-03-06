import app from "./app";
import config from "config";
import log from "./logger";



const host = config.get("host") as string;
const port = config.get("port") as number;


app.listen(port, host, ()=>{
    log.info(`Server listening at http://${host}:${port}`);
    // connect to db
})