const swaggerAutogen = require("swagger-autogen")({ language: "ko" });

const doc = {
  info: {
    version: "1.0.0",
    title: "서울문화공연알림",
    description: "프로그래머스 웹 풀스택 3기 - 7월 프로젝트",
  },
  host: "localhost:3000",
  apis: [],
  // schemes: ["http"],
  // // schemes: ["https" ,"http"],
};

const outputFile = "./swagger-output.json"; // 같은 위치에 swagger-output.json을 만든다.
const endpointsFiles = [
  "../app.ts", // 라우터가 명시된 곳을 지정한다.
];

swaggerAutogen(outputFile, endpointsFiles, doc);
