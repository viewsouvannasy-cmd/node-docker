import { Router } from "express";

const route = Router();

import {
  getAllPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controller/post-controller.js";

route.get("/", getAllPost);
route.get("/:id", getPostById);
route.post("/create", createPost);
route.put("/update/:id", updatePost);
route.delete("/delete/:id", deletePost);

export default route;
