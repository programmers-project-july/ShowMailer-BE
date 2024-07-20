const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

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
// 기본 라우트
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
