const express = require("express");
const app = express();
const PORT = 3000;

// swagger setting
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger-output.json");

// // mongoose
// const connect = require('./schemas');
// connect();

// body-parser
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(PORT, " 포트로 서버 실행");
});
