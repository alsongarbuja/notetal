import Express from "express";
import { jsonify } from "%/helpers/backend/api/jsonify";
import { deleteNotes, getSingleNotes, updateNotes } from "%/controller/notes.controller";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const note = await getSingleNotes(query.notesId as string);

  if(!note) {
    res.status(400).json(jsonify({message: "No such note found"}, false))
    return;
  }
  res.status(200).json(jsonify(note))
}

export async function PATCH(req: Express.Request, res: Express.Response) {
  const { body, query } = req;
  const note = await updateNotes(query.notesId as string, body);
  res.status(200).json(jsonify(note))
}

export async function DELETE(req: Express.Request, res: Express.Response) {
  const { query } = req;
  await deleteNotes(query.notesId as string);
  res.status(200).json(jsonify({ status: "successfully deleted note" }))
}