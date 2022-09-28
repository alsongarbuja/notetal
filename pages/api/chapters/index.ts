import dbConnect from "../../../lib/server";
import Express from "express";
import Chapter from "../../../models/Chapter";
import { chapterType } from "../../../types/models";
import mongoose from "mongoose";
import { jsonify } from "../../../helpers/backend/api/jsonify";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();

    switch (method) {
        case "GET":
            let chapters: chapterType[];
            if(query.createrId){
                const cId = new mongoose.Types.ObjectId(query.createrId as string)
                
                chapters = await Chapter.find({ createdBy: cId })
            }else{
                chapters = await Chapter.find({})
            }

            if(query.hasLesson){
                chapters = chapters.filter((chapter) => chapter.hasLesson)
            }
            
            res.status(200).json(jsonify(chapters))
            break;
        case "POST":
            const chapter = await Chapter.create(req.body);
            res.status(200).json(jsonify(chapter))
            break;
        default:
            res.status(400).json(jsonify({message: "No such method found for this route"}, false))
            break;
    }
}