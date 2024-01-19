import express from "express";
import pkg  from "body-parser";
import router from "./routes/router.js";
import db from "./database/database.js";
import cors from "cors";

const app = express();
const { json, urlencoded } = pkg;

app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());

app.listen(3001, function() {
    console.log("Listening to port 3001");
});

app.use("/", router);