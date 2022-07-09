import dbConnect from "../../../lib/server";
import Express from "express";
import Topic from "../../../models/Topic";
import { topicType } from "../../../types/models";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();

    switch (method) {
        case "GET":
            let topics: topicType[];
            if(query.createrId){
                const cId = new mongoose.Types.ObjectId(query.createrId as string)
                
                topics = await Topic.find({ createdBy: cId })
            }else if(query.height){
                const height = query.height as unknown as number;

                topics = await Topic.find({ topicHeight: height })
            }else{
                topics = await Topic.find({})
            }
            
            res.status(200).json({ status: "success", topics: topics })
            break;
        case "POST":
            const topic = await Topic.create(req.body);
            res.status(200).json({ status: "success", topic: topic })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}