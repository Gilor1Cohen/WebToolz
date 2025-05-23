const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/Auth", require("./controllers-layer/AuthControllers"));
app.use("/Payment", require("./controllers-layer/PaymentControllers"));
app.use("/Tools", require("./controllers-layer/ToolsControllers"));

app.use(/.*/, (req, res) => {
  res.status(404).send(`Route not found ${req.originalUrl}`);
});

app
  .listen(4201, () => {
    console.log("Listening on 4201");
  })
  .on("error", (err) => {
    err.code === "EADDRINUSE"
      ? console.log("Error: Address in use")
      : console.log("Error: Unknown error");
  });
