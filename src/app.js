import express from "express";
import TaskRoutes from "./routes/task-routes";
import morgan from "morgan";
import cors from "cors";
import config from "./config";

const app = express();

//settings
app.set("port", config.port);

//Middlewares
const corsOptions = {};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.use("/api/tasks", TaskRoutes);

export default app;
