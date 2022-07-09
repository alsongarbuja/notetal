import dbConnect from "../../../lib/server";
import Express from "express";
import Topic from "../../../models/Topic";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const topicId = new mongoose.Types.ObjectId(query.topicId as string)                
    const topic = await Topic.findById(topicId)

    switch (method) {
        case "GET":            
            res.status(200).json({ status: "success", topic: topic })
            break;
        case "PUT":
            Object.assign(topic, req.body);
            topic.save();
            res.status(200).json({ status: "success", topic: topic })
            break;
        case "DELETE":
            topic.delete();
            res.status(200).json({ status: "success" })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}