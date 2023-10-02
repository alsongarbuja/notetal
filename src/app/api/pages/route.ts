import Express from "express";
import { pageType } from "%/types/models";
import { jsonify } from "%/helpers/backend/api/jsonify";
import { addPages, getPages } from "%/controller/pages.controller";

export async function GET(req: Express.Request, res: Express.Response) {
  const { query } = req;
  const pages: pageType[] = await getPages(query);
  res.status(200).json(jsonify(pages))
}

export async function POST(req: Express.Request, res: Express.Response) {
  const { body } = req;
  const page = await addPages(body);
  res.status(200).json(jsonify(page));
}
