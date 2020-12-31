import { config } from "dotenv";
config();
export default {
  mongodbURL: process.env.MONGODB_URI || "mongodb://localhost/taskapi",
  port: process.env.PORT || 3000,
};
