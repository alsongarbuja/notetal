import Express from "express";
import { subNotesType } from "%/types/models";
import { jsonify } from "%/helpers/backend/api/jsonify";
import { addSubNotes, getSubNotes } from "%/controller/subnotes.controller";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const subnotes: subNotesType[] = await getSubNotes(query);            
  res.status(200).json(jsonify(subnotes));
}

export async function POST(req: Express.Request, res: Express.Response) {
  const { body } = req;
  const subnotes = await addSubNotes(body);
  res.status(200).json(jsonify(subnotes));
}