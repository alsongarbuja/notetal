import dbConnect from "../../../lib/server";
import Express from "express";
import SubNotes from "../../../models/SubNotes";
import { subNotesType } from "../../../types/models";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();

    switch (method) {
        case "GET":
            let subnotes: subNotesType[];
            if(query.createrId){
                const cId = new mongoose.Types.ObjectId(query.createrId as string)
                
                subnotes = await SubNotes.find({ createdBy: cId })
            }else{
                subnotes = await SubNotes.find({})
            }

            if(query.notesId){
                subnotes = subnotes.filter((subnote) => subnote.notesId.toString() === query.notesId)
            }
            if(query.hasPage){
                subnotes = subnotes.filter((subnote) => subnote.hasPage)
            }
            
            res.status(200).json({ status: "success", subnotes: subnotes })
            break;
        case "POST":
            const subnote = await SubNotes.create(req.body);
            res.status(200).json({ status: "success", subnote: subnote })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}