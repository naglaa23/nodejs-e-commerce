import "dotenv/config";
import express from "express";
import initialConnections from "./db/initConnection.js";
import cors from "cors";
import mainRouter from "./src/modules/mainRouter.js";

const app = express();
app.use(cors());
app.use("*", cors());
app.use(express.json());
initialConnections();

app.use(mainRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
