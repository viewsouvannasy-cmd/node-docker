import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} from "./config/config.js";

import postRoute from "./routes/route-post.js";
import authRoute from "./routes/auth-route.js";

import { RedisStore } from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

import { protect } from "./middleware/authMiddleware.js";

let redisClient = createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`,
});

redisClient.connect().catch((e) => {
  console.log("connect redis error", e);
});

function connectWithRetry() {
  mongoose
    .connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`,
    )
    .then(() => {
      console.log("successfully connected to DB");
    })
    .catch((e) => {
      console.log(e);
      setTimeout(() => {
        connectWithRetry();
      }, 5000);
    });
}

connectWithRetry();

const app = express();
const port = process.env.PORT || 3000;

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
  }),
);

app.enable("trust proxy");
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  console.log("this server is run");
  res.status(200).json({ ok: true });
});

app.use("/api/auth", authRoute);

app.use("/api/posts", protect, postRoute);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
