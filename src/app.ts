import express from "express";
import routes from "./routes";
import connect from "./db/connect";

const app = express();

connect();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
routes(app);
export default app;