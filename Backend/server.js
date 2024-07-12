const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to mongoDB database successfully");
    app.listen(port, () =>
      console.log(`Server listening on port http://localhost:${port}!`)
    );
  })
  .catch((e) => console.log("Error while trying to connect", e));

app.use("/api/auth", require("./Routes/authRoute"));
app.use("/api/user", require("./Routes/userRoute"));
app.use("/api/company", require("./Routes/companyRoute"));
app.use("/api/room", require("./Routes/roomRoute"));

app.get("", (req, res) => {
  res.send("Connected to backend successfully");
});
