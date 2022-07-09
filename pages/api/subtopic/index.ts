import dbConnect from "../../../lib/server";
import Express from "express";
import SubTopic from "../../../models/SubTopic";
import { subTopicType } from "../../../types/models";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();

    switch (method) {
        case "GET":
            let subtopics: subTopicType[];
            if(query.createrId){
                const cId = new mongoose.Types.ObjectId(query.createrId as string)
                
                subtopics = await SubTopic.find({ createdBy: cId })
            }else{
                subtopics = await SubTopic.find({})
            }
            
            res.status(200).json({ status: "success", subtopics: subtopics })
            break;
        case "POST":
            const subtopic = await SubTopic.create(req.body);
            res.status(200).json({ status: "success", subtopic: subtopic })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}