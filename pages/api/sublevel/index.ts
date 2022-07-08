import dbConnect from "../../../lib/server";
import Express from "express";
import SubLevel from "../../../models/SubLevel";
import { subLevelType } from "../../../types/models";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();

    switch (method) {
        case "GET":
            let sublevels: subLevelType[];
            if(query.createrId){
                const cId = new mongoose.Types.ObjectId(query.createrId as string)
                
                sublevels = await SubLevel.find({ createdBy: cId })
            }else{
                sublevels = await SubLevel.find({})
            }
            
            res.status(200).json({ status: "success", sublevels: sublevels })
            break;
        case "POST":
            const sublevel = await SubLevel.create(req.body);
            res.status(200).json({ status: "success", sublevel: sublevel })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}