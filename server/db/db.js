// const { credentials } = require("../config");
import { credentials } from "../config.cjs";
// console.log("credentials = ", credentials);
// initialize database connection
import mongoose from "mongoose";
import UserModel from "../models/user.js";

const env = process.env.NODE_ENV || "development";
const { connectionString } = credentials.mongo;
if (!connectionString) {
  console.error("MongoDB connection string missing!");
  process.exit(1);
}

mongoose.set("strictQuery", true);

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB error: " + err.message);
  process.exit(1);
});
db.once("open", () => console.log("MongoDB connection established"));

export const getUserByEmail = async (email) => UserModel.findOne(email);

export const createUser = async (data) => new UserModel(data).save(); // create collection

// 关闭数据库连接
export const close = () => mongoose.connection.close();
