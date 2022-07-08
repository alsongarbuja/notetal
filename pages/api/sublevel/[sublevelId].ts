import dbConnect from "../../../lib/server";
import Express from "express";
import SubLevel from "../../../models/SubLevel";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const cId = new mongoose.Types.ObjectId(query.sublevelId as string)                
    const sublevel = await SubLevel.findById(cId)

    switch (method) {
        case "GET":            
            res.status(200).json({ status: "success", sublevel: sublevel })
            break;
        case "PUT":
            Object.assign(sublevel, req.body);
            sublevel.save();
            res.status(200).json({ status: "success", sublevel: sublevel })
            break;
        case "DELETE":
            sublevel.delete();
            res.status(200).json({ status: "success" })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}