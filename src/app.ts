const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

// swagger setting
const swaggerUi = require("swagger-ui-express");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const eventRouter = require("./routes/EventRoutes");
const likeRouter = require("./routes/LikeRoutes");

const corsOptions = {
  origin: ["https://dev-alarm-fe.vercel.app", "http://localhost:5173"], // 프론트엔드 도메인
  credentials: true, // 자격 증명 허용
};

app.use(cors(corsOptions));

const swaggerOptions = {
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css",
};
const spec = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./swagger/swagger-output.json"), "utf8")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec, swaggerOptions));

app.use("/events", eventRouter);
app.use("/likes", likeRouter);

// 기본 라우트
app.get("/", (req: any, res: any) => {
  res.send("Welcome to the Express server!");
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
