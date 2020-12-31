import { Router } from "express";

// import all controllers
import * as taskCtrl from "../controllers/task-controller.js";

const router = Router();

// Add routes

router.post("/", taskCtrl.createTask);

router.get("/", taskCtrl.findAllTask);

router.get("/done", taskCtrl.findAllDoneTask);

router.get("/:id", taskCtrl.findOneTask);

router.delete("/:id", taskCtrl.deleteTask);

router.put("/:id", taskCtrl.updateTask);

export default router;
