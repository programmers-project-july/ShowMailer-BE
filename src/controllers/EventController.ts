import { Request, Response } from "express";
import axios from "axios";

const dotenv = require("dotenv");
dotenv.config();

// 임시 start, end
const start = 1;
const end = 10;

const BASE_URL = `http://openapi.seoul.go.kr:8088/${process.env.API_KEY}/json/culturalEventInfo/${start}/${end}/`;

export const getCulturalEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await axios.get(BASE_URL);
    const events = response.data.culturalEventInfo.row;

    res.json(
      events.map((event: any) => ({
        // id: event.id,
        title: event.TITLE,
        image: event.MAIN_IMG,
        // addr: event.HMPG_ADDR,
      }))
    );
  } catch (error) {
    res.status(500).send("Error retrieving cultural events");
  }
};

export const getCulturalEventDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const eventId = req.params.id;
  try {
    const response = await axios.get(BASE_URL);
    const events = response.data.culturalEventInfo.row;

    const event = events.find((e: any) => e.id === eventId);

    if (event) {
      //   const like = await Like.findOne({ where: { eventId } });
      //   event.likeCount = like ? like.count : 0;
      res.json(event);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving event detail");
  }
};
