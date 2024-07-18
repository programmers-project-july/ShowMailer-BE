import { Request, Response } from "express";
import axios from "axios";

const dotenv = require("dotenv");
dotenv.config();

const { API_KEY } = process.env;
const BATCH_SIZE = 1000; // open api에서 1000개씩만 조회 가능하기 때문에 끊어서 조회

// 전체 데이터 조회
export const getCulturalEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let startIndex = 1;
    let endIndex = BATCH_SIZE;
    let events = [];
    let totalCount = 0;

    // 첫 번째 호출로 전체 개수 가져오기
    const eventslUrl = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/${startIndex}/${endIndex}`;
    const initialResponse = await axios.get(eventslUrl);
    if (initialResponse.data.culturalEventInfo.RESULT.CODE === "INFO-000") {
      totalCount = initialResponse.data.culturalEventInfo.list_total_count;
      events = events.concat(initialResponse.data.culturalEventInfo.row);
    }

    // 나머지 데이터 가져오기 (+1000개씩 조회)
    while (endIndex < totalCount) {
      startIndex += BATCH_SIZE;
      endIndex += BATCH_SIZE;
      const apiUrl = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/${startIndex}/${endIndex}`;
      const response = await axios.get(apiUrl);
      if (response.data.culturalEventInfo.RESULT.CODE === "INFO-000") {
        events = events.concat(response.data.culturalEventInfo.row);
      }
    }

    // 전체 공연 개수 출력
    console.log(`Total cultural events: ${totalCount}`);

    res.status(200).json(
      events.map((event: any) => ({
        title: event.TITLE,
        image: event.MAIN_IMG,
        codename: event.CODENAME,
        date: event.DATE,
      }))
    );
  } catch (error) {
    res.status(500).send("Error retrieving cultural events");
  }
};

// 공연 상세조회
export const getCulturalEventDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { codename, title, date } = req.params;
  try {
    const detailUrl = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/1/${codename}/${title}/${date}`;
    const response = await axios.get(detailUrl);

    if (response.data.culturalEventInfo.RESULT.CODE === "INFO-000") {
      const event = response.data.culturalEventInfo.row.find(
        (e: any) =>
          e.CODENAME === codename && e.TITLE === title && e.DATE === date
      );

      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).send("Event not found");
      }
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving event detail");
  }
};
