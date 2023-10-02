import Chapters from "%/models/Chapter";
import dbConnect from "%/server"
import { dynamicObject } from "%/types/custom";
import { chapterType } from "%/types/models";
import mongoose from "mongoose";

export const getChapters = async (query?: dynamicObject) => {
  await dbConnect();
  const chapters: chapterType[] = query?.createrId ? await Chapters.find({ createdBy: new mongoose.Types.ObjectId(query?.createrId) }) : await Chapters.find({ });
  return query?.hasLesson ? chapters.filter(n => n.hasLesson) : chapters;
}

export const addChapters = async (chapters: chapterType) => {
  await dbConnect();
  const chapter = await Chapters.create(chapters);
  return chapter;
}

export const getSingleChapters = async (chapterId: string) => {
  await dbConnect();
  const chaptersId = new mongoose.Types.ObjectId(chapterId)                
  const chapter = await Chapters.findById(chaptersId)
  return chapter;
}

export const updateChapters = async (chapterId: string, chapters: chapterType) => {                
  const chapter = await getSingleChapters(chapterId);
  Object.assign(chapter, chapters);
  chapter.save();
  return chapter;
}

export const deleteChapters = async (chapterId: string) => {
  const chapter = await getSingleChapters(chapterId);
  chapter.delete();
  return { status: "success" };
}