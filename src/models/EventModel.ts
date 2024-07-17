import axios from "axios";

const API_KEY = "sample";
const start = 1;
const end = 5;

const BASE_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/${start}/${end}/`;

interface CulturalEvent {
  CODENAME: string;
  GUNAME: string;
  TITLE: string;
  DATE: string;
  PLACE: string;
  ORG_NAME: string;
  USE_TRGT: string;
  USE_FEE: string;
  PLAYER: string;
  PROGRAM: string;
  ETC_DESC: string;
  ORG_LINK: string;
  MAIN_IMG: string;
  RGSTDATE: string;
  TICKET: string;
  STRTDATE: string;
  END_DATE: string;
  THEMECODE: string;
  LOT: string;
  LAT: string;
  IS_FREE: string;
  HMPG_ADDR: string;
}

const getCulturalEventInfo = async (): Promise<CulturalEvent[]> => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.culturalEventInfo.row;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getCulturalEventInfo, CulturalEvent };
