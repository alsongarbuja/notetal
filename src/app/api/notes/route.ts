import Express from "express";
import { jsonify } from "%/helpers/backend/api/jsonify";
import { addNotes, getNotes } from "%/controller/notes.controller";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const notes = await getNotes(query);
  res.status(200).json(jsonify(notes))
}

export async function POST(req: Express.Request, res: Express.Response) {
  const { body } = req;
  const notes = await addNotes(body);
  res.status(201).json(jsonify(notes))
}