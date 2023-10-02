import Lessons from "%/models/Lesson";
import dbConnect from "%/server"
import { dynamicObject } from "%/types/custom";
import { lessonType } from "%/types/models";
import mongoose from "mongoose";

export const getLessons = async (query?: dynamicObject) => {
  await dbConnect();
  const lessons: lessonType[] = query?.createrId ? await Lessons.find({ createdBy: new mongoose.Types.ObjectId(query?.createrId) }) : await Lessons.find({ });
  return lessons;
}

export const addLessons = async (lessons: lessonType) => {
  await dbConnect();
  const lesson = await Lessons.create(lessons);
  return lesson;
}

export const getSingleLessons = async (lessonId: string) => {
  await dbConnect();
  const lessonsId = new mongoose.Types.ObjectId(lessonId)                
  const lesson = await Lessons.findById(lessonsId)
  return lesson;
}

export const updateLessons = async (lessonId: string, lessons: lessonType) => {                
  const lesson = await getSingleLessons(lessonId);
  Object.assign(lesson, lessons);
  lesson.save();
  return lesson;
}

export const deleteLessons = async (lessonId: string) => {
  const lesson = await getSingleLessons(lessonId);
  lesson.delete();
  return { status: "success" };
}