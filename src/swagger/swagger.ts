const swaggerAutogen = require("swagger-autogen")({ language: "ko" });

const doc = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Show Mailer",
    description: "서울시 문화 행사 알리미 웹앱",
  },
  host: "demo-be-navy.vercel.app",
  basePath: "/",
  schemes: ["http", "https"],
  tags: [
    {
      name: "Events",
      description: "문화 행사 관련 API",
    },
    {
      name: "Likes",
      description: "좋아요 관련 API",
    },
  ],
  paths: {
    "/events/": {
      get: {
        tags: ["Events"],
        summary: "전체, 카테고리별, 검색 및 상세 문화 행사 조회",
        description:
          "전체 문화 행사 조회, 특정 카테고리별 조회, 공연/행사명 검색, 상세 정보를 조회합니다.",
        parameters: [
          {
            name: "page",
            in: "query",
            type: "integer",
            description: "페이지 번호",
          },
          {
            name: "codename",
            in: "query",
            type: "string",
            description: "분류",
          },
          {
            name: "title",
            in: "query",
            type: "string",
            description: "공연/행사명",
          },
          {
            name: "date",
            in: "query",
            type: "string",
            description: "날짜/시간",
          },
        ],
        responses: {
          "200": {
            description: "성공적으로 조회되었습니다.",
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                  },
                  codename: {
                    type: "string",
                  },
                  date: {
                    type: "string",
                  },
                },
              },
            },
          },
          "404": {
            description: "찾을 수 없음",
          },
          "500": {
            description: "내부 서버 오류",
          },
        },
      },
    },
    "/likes/add": {
      post: {
        tags: ["Likes"],
        summary: "좋아요 추가",
        description: "공연에 좋아요를 추가합니다.",
        parameters: [
          {
            name: "like",
            in: "body",
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "showmailer@example.com",
                },
                codename: {
                  type: "string",
                  example: "국악",
                },
                title: {
                  type: "string",
                  example: "서울시국악관현악단 실내악 시리즈 Ⅱ",
                },
                date: {
                  type: "string",
                  example: "2024-10-25~2024-10-25",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "좋아요가 성공적으로 추가되었습니다.",
          },
          "500": {
            description: "서버 오류로 좋아요를 추가하지 못했습니다.",
          },
        },
      },
    },
    "/likes/remove": {
      delete: {
        tags: ["Likes"],
        summary: "좋아요 삭제",
        description: "공연에 추가된 좋아요를 삭제합니다.",
        parameters: [
          {
            name: "like",
            in: "body",
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "showmailer@example.com",
                },
                codename: {
                  type: "string",
                  example: "국악",
                },
                title: {
                  type: "string",
                  example: "서울시국악관현악단 실내악 시리즈 Ⅱ",
                },
                date: {
                  type: "string",
                  example: "2024-10-25~2024-10-25",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "좋아요가 성공적으로 삭제되었습니다.",
          },
          "404": {
            description: "해당 좋아요를 찾을 수 없습니다.",
          },
          "500": {
            description: "서버 오류로 좋아요를 삭제하지 못했습니다.",
          },
        },
      },
    },
    "/likes/": {
      get: {
        tags: ["Likes"],
        summary: "좋아요 목록 조회",
        description: "사용자의 좋아요 목록을 조회합니다.",
        parameters: [
          {
            name: "like",
            in: "body",
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "showmailer@example.com",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "좋아요 목록을 성공적으로 조회했습니다.",
          },
          "500": {
            description: "서버 오류로 좋아요 목록을 조회하지 못했습니다.",
          },
        },
      },
    },
    "/likes/check": {
      get: {
        tags: ["Likes"],
        summary: "특정 공연에 사용자가 좋아요를 눌렀는지 확인",
        description: "특정 공연에 사용자가 좋아요를 눌렀는지 확인합니다.",
        parameters: [
          {
            name: "like",
            in: "body",
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "showmailer@example.com",
                },
                codename: {
                  type: "string",
                  example: "국악",
                },
                title: {
                  type: "string",
                  example: "서울시국악관현악단 실내악 시리즈 Ⅱ",
                },
                date: {
                  type: "string",
                  example: "2024-10-25~2024-10-25",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "좋아요 상태를 성공적으로 확인했습니다.",
            schema: {
              type: "object",
              properties: {
                liked: {
                  type: "boolean",
                },
              },
            },
          },
          "500": {
            description: "서버 오류로 좋아요 상태를 확인하지 못했습니다.",
          },
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["../app.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
