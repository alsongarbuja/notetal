import dbConnect from "../../../lib/server";
import Express from "express";
import SubNotes from "../../../models/SubNotes";
import mongoose from "mongoose";
import { jsonify } from "../../../helpers/backend/api/jsonify";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const cId = new mongoose.Types.ObjectId(query.subnotesId as string)                
    const subnote = await SubNotes.findById(cId)

    if(!subnote) {
        res.status(400).json(jsonify({message: "No such subnote found"}, false))
        return;
    }

    switch (method) {
        case "GET":            
            res.status(200).json(jsonify(subnote))
            break;
        case "PUT":
            Object.assign(subnote, req.body);
            subnote.save();
            res.status(200).json(jsonify(subnote))
            break;
        case "DELETE":
            subnote.delete();
            res.status(200).json(jsonify({ status: "success" }))
            break;
        default:
            res.status(400).json(jsonify({message: "No such method found for this route"}, false))
            break;
    }
}