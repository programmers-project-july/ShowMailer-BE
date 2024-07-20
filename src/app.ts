const express = require("express");
const app = express();

// swagger setting
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger/swagger-output.json");

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

app.listen(process.env.PORT, function () {
  console.log("Server open.");
});

const eventRouter = require("./routes/EventRoutes");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/events", eventRouter);
