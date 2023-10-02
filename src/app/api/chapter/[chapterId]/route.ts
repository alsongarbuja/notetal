import Express from "express";
import { jsonify } from "%/helpers/backend/api/jsonify";
import { deleteChapters, getSingleChapters, updateChapters } from "%/controller/chapters.controller";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const chapter = await getSingleChapters(query.chapterId as string);

  if(!chapter) {
    res.status(400).json(jsonify({message: "No such chapter found"}, false))
    return;
  }
  res.status(200).json(jsonify(chapter))
}

export async function PATCH(req: Express.Request, res: Express.Response) {
  const { body, query } = req;
  const chapter = await updateChapters(query.chapterId as string, body);
  res.status(200).json(jsonify(chapter))
}

export async function DELETE(req: Express.Request, res: Express.Response) {
  const { query } = req;
  await deleteChapters(query.chapterId as string);
  res.status(200).json(jsonify({ status: "successfully deleted chapter" }))
}