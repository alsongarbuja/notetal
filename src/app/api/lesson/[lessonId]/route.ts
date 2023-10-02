import Express from "express";
import { jsonify } from "%/helpers/backend/api/jsonify";
import { deleteLessons, getSingleLessons, updateLessons } from "%/controller/lessons.controller";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const lesson = await getSingleLessons(query.lessonId as string);

  if(!lesson) {
    res.status(400).json(jsonify({message: "No such lesson found"}, false))
    return;
  }
  res.status(200).json(jsonify(lesson))
}

export async function PATCH(req: Express.Request, res: Express.Response) {
  const { body, query } = req;
  const lesson = await updateLessons(query.lessonId as string, body);
  res.status(200).json(jsonify(lesson))
}

export async function DELETE(req: Express.Request, res: Express.Response) {
  const { query } = req;
  await deleteLessons(query.lessonId as string);
  res.status(200).json(jsonify({ status: "successfully deleted lesson" }))
}