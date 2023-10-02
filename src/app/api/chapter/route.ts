import Express from "express";
import { chapterType } from "%/types/models";
import { jsonify } from "%/helpers/backend/api/jsonify";
import { addChapters, getChapters } from "%/controller/chapters.controller";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const chapters: chapterType[] = await getChapters(query);
  res.status(200).json(jsonify(chapters))
}

export async function POST(req: Express.Request, res: Express.Response) {
  const { body } = req;
  const page = await addChapters(body);
  res.status(200).json(jsonify(page));
}
