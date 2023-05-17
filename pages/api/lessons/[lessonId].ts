import dbConnect from "../../../lib/server";
import Express from "express";
import Lesson from "../../../models/Lesson";
import mongoose from "mongoose";
import { jsonify } from "../../../helpers/backend/api/jsonify";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const cId = new mongoose.Types.ObjectId(query.lessonId as string)                
    const lesson = await Lesson.findById(cId)

    if(!lesson){
        res.status(400).json(jsonify({message: "No such lesson found"}, false))
        return;
    }

    switch (method) {
        case "GET":            
            res.status(200).json(jsonify(lesson))
            break;
        case "PUT":
            Object.assign(lesson, req.body);
            lesson.save();
            res.status(200).json(jsonify(lesson))
            break;
        case "DELETE":
            lesson.delete();
            res.status(200).json(jsonify({ status: "success" }))
            break;
        default:
            res.status(400).json(jsonify({message: "No such method found for this route"}))
            break;
    }
}