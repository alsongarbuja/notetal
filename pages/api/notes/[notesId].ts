import dbConnect from "../../../lib/server";
import Express from "express";
import Notes from "../../../models/Notes";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const notesId = new mongoose.Types.ObjectId(query.notesId as string)                
    const note = await Notes.findById(notesId)

    switch (method) {
        case "GET":            
            res.status(200).json({ status: "success", note: note })
            break;
        case "PUT":
            Object.assign(note, req.body);
            note.save();
            res.status(200).json({ status: "success", note: note })
            break;
        case "DELETE":
            note.delete();
            res.status(200).json({ status: "success" })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}