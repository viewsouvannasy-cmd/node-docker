import { Router } from "express";

const route = Router();

import { siupUp, login } from "../controller/auth-controller.js";

route.post("/signup", siupUp);
route.post("/login", login);

export default route;
