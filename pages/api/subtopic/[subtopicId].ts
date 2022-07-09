import dbConnect from "../../../lib/server";
import Express from "express";
import SubTopic from "../../../models/SubTopic";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const cId = new mongoose.Types.ObjectId(query.subtopicId as string)                
    const subtopic = await SubTopic.findById(cId)

    switch (method) {
        case "GET":            
            res.status(200).json({ status: "success", subtopic: subtopic })
            break;
        case "PUT":
            Object.assign(subtopic, req.body);
            subtopic.save();
            res.status(200).json({ status: "success", subtopic: subtopic })
            break;
        case "DELETE":
            subtopic.delete();
            res.status(200).json({ status: "success" })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}