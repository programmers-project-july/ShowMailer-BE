const swaggerAutogen = require("swagger-autogen")({ language: "ko" });

const doc = {
  info: {
    version: "1.0.0",
    title: "Show Mailer",
    description: "서울시 문화 행사 알리미 웹앱",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["../app.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
