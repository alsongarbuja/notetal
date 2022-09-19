import dbConnect from "../../../lib/server";
import Express from "express";
import Lesson from "../../../models/Lesson";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const cId = new mongoose.Types.ObjectId(query.lessonId as string)                
    const lesson = await Lesson.findById(cId)

    switch (method) {
        case "GET":            
            res.status(200).json({ status: "success", lesson: lesson })
            break;
        case "PUT":
            Object.assign(lesson, req.body);
            lesson.save();
            res.status(200).json({ status: "success", lesson: lesson })
            break;
        case "DELETE":
            lesson.delete();
            res.status(200).json({ status: "success" })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}