import Express from "express";
import { lessonType } from "%/types/models";
import { jsonify } from "%/helpers/backend/api/jsonify";
import { addLessons, getLessons } from "%/controller/lessons.controller";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const lessons: lessonType[] = await getLessons(query);
  res.status(200).json(jsonify(lessons))
}

export async function POST(req: Express.Request, res: Express.Response) {
  const { body } = req;
  const page = await addLessons(body);
  res.status(200).json(jsonify(page));
}
