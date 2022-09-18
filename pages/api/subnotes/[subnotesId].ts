import dbConnect from "../../../lib/server";
import Express from "express";
import SubNotes from "../../../models/SubNotes";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const cId = new mongoose.Types.ObjectId(query.subnotesId as string)                
    const subnote = await SubNotes.findById(cId)

    switch (method) {
        case "GET":            
            res.status(200).json({ status: "success", subnote: subnote })
            break;
        case "PUT":
            Object.assign(subnote, req.body);
            subnote.save();
            res.status(200).json({ status: "success", subnote: subnote })
            break;
        case "DELETE":
            subnote.delete();
            res.status(200).json({ status: "success" })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}