import Express from "express";
import { jsonify } from "%/helpers/backend/api/jsonify";
import { deletePages, getSinglePages, updatePages } from "%/controller/pages.controller";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const page = await getSinglePages(query.pageId as string);

  if(!page) {
    res.status(400).json(jsonify({message: "No such page found"}, false))
    return;
  }
  res.status(200).json(jsonify(page))
}

export async function PATCH(req: Express.Request, res: Express.Response) {
  const { body, query } = req;
  const page = await updatePages(query.pageId as string, body);
  res.status(200).json(jsonify(page))
}

export async function DELETE(req: Express.Request, res: Express.Response) {
  const { query } = req;
  await deletePages(query.pageId as string);
  res.status(200).json(jsonify({ status: "successfully deleted page" }))
}