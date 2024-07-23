import { Request, Response } from "express";
import axios from "axios";

const API_KEY = process.env.API_KEY;
const BATCH_SIZE = 8; // 한 페이지에 들어갈 공연 수

const removeAllBrackets = (title: string): string => {
  // 대괄호가 두 쌍 이상 있는 경우 처리
  const doubleBracketMatch = title.match(/\[.*?\]\s*(.*?)\s*\[.*?\]/);
  if (doubleBracketMatch) {
    const middleText = doubleBracketMatch[1].trim();
    if (middleText) {
      return middleText;
    }
    // 대괄호 사이에 텍스트가 없을 때 대괄호 뒤의 문자열을 반환
    const trailingText = title.split(/\[.*?\]\s*\[.*?\]\s*/)[1]?.trim();
    if (trailingText) {
      return trailingText;
    }
  }

  // 대괄호가 한 쌍만 있는 경우 처리
  const singleBracketMatchStart = title.match(/^\[.*?\]\s*(.*)$/);
  if (singleBracketMatchStart) {
    // 대괄호가 문자열의 시작 부분에 있는 경우
    return singleBracketMatchStart[1].trim();
  }

  const singleBracketMatchEnd = title.match(/^(.*?)\s*\[.*?\]$/);
  if (singleBracketMatchEnd) {
    // 대괄호가 문자열의 끝 부분에 있는 경우
    return singleBracketMatchEnd[1].trim();
  }

  // 대괄호가 없는 경우 원래 문자열 반환
  return title.trim();
};

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

  const extractedTitle = title ? removeAllBrackets(title as string) : " ";

  try {
    const eventsUrl = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/${startIndex}/${endIndex}/${
      codename || " "
    }/${extractedTitle}/${date || ""}`;
    const response = await axios.get(eventsUrl);

    if (response.data.culturalEventInfo.RESULT.CODE === "INFO-000") {
      const events = response.data.culturalEventInfo.row;
      res.status(200).json(
        events.map((event: any) => ({
          title: event.TITLE,
          image: event.MAIN_IMG,
          codename: event.CODENAME,
          date: event.DATE,
          place: event.PLACE,
          org_link: event.ORG_LINK,
        }))
      );
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(200).send([]);
  }
};
