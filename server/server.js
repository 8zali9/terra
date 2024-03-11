// imports
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const port = process.env.port || 8080;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
// app.use("/webapp-name/");

app.get("/realestate/", (req, res) => {
  res.status(200).json({ message: "~json from server~" });
});

app.listen(port, () => {
  if (process.env.NODE_ENV == "development") {
    console.log(`Server up at port ${port} in ${process.env.NODE_ENV} mode`);
  }
});
