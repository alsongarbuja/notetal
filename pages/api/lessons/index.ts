import dbConnect from "../../../lib/server";
import Express from "express";
import Lesson from "../../../models/Lesson";
import { lessonType } from "../../../types/models";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();

    switch (method) {
        case "GET":
            let lessons: lessonType[];
            if(query.creatorId){
                const cId = new mongoose.Types.ObjectId(query.creatorId as string)
                
                lessons = await Lesson.find({ createdBy: cId })
            }else{
                lessons = await Lesson.find({})
            }
            
            res.status(200).json({ status: "success", lessons: lessons })
            break;
        case "POST":
            const lesson = await Lesson.create(req.body);
            res.status(200).json({ status: "success", lesson: lesson })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}