import dbConnect from "../../../lib/server";
import Express from "express";
import Page from "../../../models/Page";
import mongoose from "mongoose";
import { jsonify } from "../../../helpers/backend/api/jsonify";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const cId = new mongoose.Types.ObjectId(query.pageId as string)                
    const page = await Page.findById(cId)

    if(!page){
        res.status(400).json(jsonify({message: "No such page found"}, false))
        return;
    }

    switch (method) {
        case "GET":            
            res.status(200).json(jsonify(page))
            break;
        case "PUT":
            Object.assign(page, req.body);
            page.save();
            res.status(200).json(jsonify(page))
            break;
        case "DELETE":
            page.delete();
            res.status(200).json(jsonify({ status: "success" }))
            break;
        default:
            res.status(400).json(jsonify({message: "No such method found for this route"}, false))
            break;
    }
}