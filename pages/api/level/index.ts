import dbConnect from "../../../lib/server";
import Express from "express";
import Level from "../../../models/Level";
import { levelType } from "../../../types/models";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();

    switch (method) {
        case "GET":
            let levels: levelType[];
            if(query.createrId){
                const cId = new mongoose.Types.ObjectId(query.createrId as string)
                
                levels = await Level.find({ createdBy: cId })
            }else if(query.height){
                const height = query.height as unknown as number;

                levels = await Level.find({ levelHeight: height })
            }else{
                levels = await Level.find({})
            }
            
            res.status(200).json({ status: "success", levels: levels })
            break;
        case "POST":
            const level = await Level.create(req.body);
            res.status(200).json({ status: "success", level: level })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}