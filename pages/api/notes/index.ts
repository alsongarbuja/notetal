import dbConnect from "../../../lib/server";
import Express from "express";
import Notes from "../../../models/Notes";
import { notesType } from "../../../types/models";
import mongoose from "mongoose";
import { jsonify } from "../../../helpers/backend/api/jsonify";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();

    switch (method) {
        case "GET":
            let notes: notesType[];
            if(query.createrId){
                const cId = new mongoose.Types.ObjectId(query.createrId as string)
                
                notes = await Notes.find({ createdBy: cId })
            }else{
                notes = await Notes.find({})
            }

            if(query.hasSubNotes)
                notes = notes.filter(note => note.hasSubNotes)
            
            res.status(200).json(jsonify(notes))
            break;
        case "POST":
            const note = await Notes.create(req.body);
            res.status(200).json(jsonify(note));
            break;
        default:
            res.status(400).json(jsonify({message: "No such method found for this route "}, false))
            break;
    }
}