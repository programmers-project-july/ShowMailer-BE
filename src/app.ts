const express = require("express");
const app = express();

// swagger setting
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger-output.json");

const dotenv = require("dotenv");
dotenv.config();

// body-parser
app.use(express.json());

app.listen(process.env.PORT, function () {
  console.log("Server open.");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
