const express = require("express");
const cors = require("cors");

require("dotenv").config();

require("./config/dbConfig");

const { usersRouter, sortRouter } = require("./routes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
   express.urlencoded({
      extended: true,
   })
);
app.use(cors());
app.use("/public", express.static("public"));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/", sortRouter);

app.listen(PORT, () => {
   console.log(`server is up and running on port ${PORT}`);
});
