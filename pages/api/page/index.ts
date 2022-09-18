import dbConnect from "../../../lib/server";
import Express from "express";
import Page from "../../../models/Page";
import { pageType } from "../../../types/models";
import mongoose from "mongoose";

export default async function handler(req: Express.Request, res: Express.Response) {
    const { method, query } = req;
    
    await dbConnect();

    switch (method) {
        case "GET":
            let pages: pageType[];
            if(query.createrId){
                const cId = new mongoose.Types.ObjectId(query.createrId as string)
                
                pages = await Page.find({ createdBy: cId })
            }else{
                pages = await Page.find({})
            }

            if(query.subNotesId){
                pages = pages.filter((page) => page.subNotesId.toString() === query.subNotesId)
            }
            
            res.status(200).json({ status: "success", pages: pages })
            break;
        case "POST":
            const page = await Page.create(req.body);
            res.status(200).json({ status: "success", page: page })
            break;
        default:
            res.status(400).json({ status: "fail", message: "No such method found for this route "})
            break;
    }
}