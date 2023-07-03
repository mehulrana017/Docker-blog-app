import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://mehul:mypassword@mongo:27017/?authSource=admin")
  .then(() => console.log("Database connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<h2>Hi There!!!</h2>");
});

app.listen(port, () => console.log(`listening on ${port}`));
