import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // 跨域资源共享

import userRoutes from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.type("text/plain");
  res.send("Youtube clone");
});

app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});

const port = process.env.port || 5000;

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port};` +
      `press Ctrl-C to terminate.`
  )
);
