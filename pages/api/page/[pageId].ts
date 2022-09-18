import dbConnect from "../../../lib/server";
import Express from "express";
import Page from "../../../models/Page";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();
    
    const cId = new mongoose.Types.ObjectId(query.pageId as string)                
    const page = await Page.findById(cId)

    switch (method) {
        case "GET":            
            res.status(200).json({ status: "success", page: page })
            break;
        case "PUT":
            Object.assign(page, req.body);
            page.save();
            res.status(200).json({ status: "success", page: page })
            break;
        case "DELETE":
            page.delete();
            res.status(200).json({ status: "success" })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}