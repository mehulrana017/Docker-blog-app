import express from "express";
import mongoose from "mongoose";

//Environment Variables
import { envs } from "./conifg/config.js";
const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_PASSWORD,
  MONGO_USER,
  PORT,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = envs;

//Redis
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

// Initialize client.
let redisClient = createClient({ url: "redis://redis" });
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

//Import Router
import postRouter from "./routes/postRoutes.js";
import authRouter from "./routes/userRoute.js";

const app = express();

//Mongo
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

//Middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Hi There!!!</h2>");
});

//Router
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", authRouter);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
