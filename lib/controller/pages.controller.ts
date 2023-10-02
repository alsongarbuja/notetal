import Pages from "%/models/Page";
import dbConnect from "%/server"
import { dynamicObject } from "%/types/custom";
import { pageType } from "%/types/models";
import mongoose from "mongoose";

export const getPages = async (query?: dynamicObject) => {
  await dbConnect();
  const pages: pageType[] = query?.createrId ? await Pages.find({ createdBy: new mongoose.Types.ObjectId(query?.createrId) }) : await Pages.find({ });
  return query?.subNotesId ? pages.filter(n => n.subNotesId.toString()===query?.subNotesId) : pages;
}

export const addPages = async (pages: pageType) => {
  await dbConnect();
  const page = await Pages.create(pages);
  return page;
}

export const getSinglePages = async (pageId: string) => {
  await dbConnect();
  const pagesId = new mongoose.Types.ObjectId(pageId)                
  const page = await Pages.findById(pagesId)
  return page;
}

export const updatePages = async (pageId: string, pages: pageType) => {                
  const page = await getSinglePages(pageId);
  Object.assign(page, pages);
  page.save();
  return page;
}

export const deletePages = async (pageId: string) => {
  const page = await getSinglePages(pageId);
  page.delete();
  return { status: "success" };
}