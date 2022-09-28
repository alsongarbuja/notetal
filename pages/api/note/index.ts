import dbConnect from "../../../lib/server";
import Express from "express";
import Notes from "../../../models/Notes";
import SubNotes from "../../../models/SubNotes";
import Page from "../../../models/Page";
import { notesType, subNotesType, pageType } from "../../../types/models";
import mongoose from "mongoose";
import { jsonify } from "../../../helpers/backend/api/jsonify";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();

    switch (method) {
        case "GET":
            let notes: notesType[], subnotes: subNotesType[], pages: pageType[];
            const cId = new mongoose.Types.ObjectId(query.creatorId as string)
            
            notes = await Notes.find({ createdBy: cId, hasSubNotes: false })
            subnotes = await SubNotes.find({ createdBy: cId, hasPage: false })
            pages = await Page.find({ createdBy: cId })            

            res.status(200).json(jsonify({notes: [
                ...notes,
                ...subnotes,
                ...pages
            ]}))
            break;
        default:
            res.status(400).json(jsonify({message: "No such method found for this route"}, false))
            break;
    }
}