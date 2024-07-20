const express = require("express");
// swagger setting
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger/swagger-output.json");

const app = express();
const port = process.env.PORT || 3000;

// Swagger UI 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

const eventRouter = require("./routes/EventRoutes");

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
