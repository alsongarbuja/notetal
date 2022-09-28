import dbConnect from "../../../lib/server";
import Express from "express";
import Notes from "../../../models/Notes";
import mongoose from "mongoose";
import { jsonify } from "../../../helpers/backend/api/jsonify";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const notesId = new mongoose.Types.ObjectId(query.notesId as string)                
    const note = await Notes.findById(notesId)

    if(!note){
        res.status(400).json(jsonify({message: "No such note found"}, false))
        return;
    }

    switch (method) {
        case "GET":            
            res.status(200).json(jsonify(note))
            break;
        case "PUT":
            Object.assign(note, req.body);
            note.save();
            res.status(200).json(jsonify(note))
            break;
        case "DELETE":
            note.delete();
            res.status(200).json(jsonify({ status: "success" }))
            break;
        default:
            res.status(400).json(jsonify({message: "No such method found for this route"}, false))
            break;
    }
}