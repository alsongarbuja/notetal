import Express from "express";
import { getNotes } from "%/controller/note.controller";
import { jsonify } from "%/helpers/backend/api/jsonify";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const notes = await getNotes(query);
  res.status(200).json(jsonify(notes))
}