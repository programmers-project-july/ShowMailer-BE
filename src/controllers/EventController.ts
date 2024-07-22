import { Request, Response } from "express";
import axios from "axios";

const API_KEY = process.env.API_KEY;
const BATCH_SIZE = 8; // 한 페이지에 들어갈 공연 수

// 전체 or 카테고리별 조회, 검색

// codename 있으면 카테고리별 조회, 없으면 전체조회
// title query 있으면 검색
export const getCulturalEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { codename, title, date } = req.query;
  const page = parseInt(req.query.page as string, BATCH_SIZE) || 1; // 페이지 번호, 기본값 1
  const startIndex = (page - 1) * BATCH_SIZE + 1;
  const endIndex = page * BATCH_SIZE;

  try {
    const eventsUrl = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/${startIndex}/${endIndex}/${
      codename || " "
    }/${title || " "}/${date || ""}`;
    const response = await axios.get(eventsUrl);

    if (response.data.culturalEventInfo.RESULT.CODE === "INFO-000") {
      const events = response.data.culturalEventInfo.row;
      res.status(200).json(
        events.map((event: any) => ({
          title: event.TITLE,
          image: event.MAIN_IMG,
          codename: event.CODENAME,
          date: event.DATE,
        }))
      );
    } else {
      res.status(404).send("No events found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving cultural events");
  }
};
