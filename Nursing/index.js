import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import bodyParser from "body-parser";
import vitalsRouter from "./routes/vitals";
import viewsRouter from './viewsRouter';
global.dev_ENV = process.env.NODE_ENV !== "production";

var app = express();
app.use(xss());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(viewsRouter);
app.use("/vitals", vitalsRouter);
// 404 handling
// =============================================================================
app.use(function (req, res, next) {
  res.status(404).send({ error: "not found" });
});




var dev_ENV = process.env.NODE_ENV !== "production";
var listener = app.listen(
  dev_ENV ? 3002 : process.env.PORT || 3002,
  function () {
    console.log(
      (dev_ENV ? "Dev" : "Prod") +
        "Mode Listening on port " +
        listener.address().port
    ); //Listening on port 8888
  }
);
