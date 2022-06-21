import dbConnect from "../../../lib/server";
import Express from "express";
import Level from "../../../models/Level";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const cId = new mongoose.Types.ObjectId(query.levelId as string)                
    const level = await Level.findById(cId)

    switch (method) {
        case "GET":            
            res.status(200).json({ status: "success", level: level })
            break;
        case "PUT":
            Object.assign(level, req.body);
            level.save();
            res.status(200).json({ status: "success", level: level })
            break;
        case "DELETE":
            level.delete();
            res.status(200).json({ status: "success" })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}