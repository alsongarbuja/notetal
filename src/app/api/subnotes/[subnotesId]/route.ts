import Express from "express";
import { jsonify } from "%/helpers/backend/api/jsonify";
import { deleteSubNotes, getSingleSubNotes, updateSubNotes } from "%/controller/subnotes.controller";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const note = await getSingleSubNotes(query.subnotesId as string);

  if(!note) {
    res.status(400).json(jsonify({message: "No such subnote found"}, false))
    return;
  }
  res.status(200).json(jsonify(note))
}

export async function PATCH(req: Express.Request, res: Express.Response) {
  const { body, query } = req;
  const note = await updateSubNotes(query.subnotesId as string, body);
  res.status(200).json(jsonify(note))
}

export async function DELETE(req: Express.Request, res: Express.Response) {
  const { query } = req;
  await deleteSubNotes(query.subnotesId as string);
  res.status(200).json(jsonify({ status: "successfully deleted subnote" }))
}