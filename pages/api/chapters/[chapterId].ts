import dbConnect from "../../../lib/server";
import Express from "express";
import Chapter from "../../../models/Chapter";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const cId = new mongoose.Types.ObjectId(query.chapterId as string)                
    const chapter = await Chapter.findById(cId)

    switch (method) {
        case "GET":            
            res.status(200).json({ status: "success", chapter: chapter })
            break;
        case "PUT":
            Object.assign(chapter, req.body);
            chapter.save();
            res.status(200).json({ status: "success", chapter: chapter })
            break;
        case "DELETE":
            chapter.delete();
            res.status(200).json({ status: "success" })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}