import dbConnect from "../../../lib/server";
import Express from "express";
import User from "../../../models/User";

export default async function handler(req: Express.Request, res: Express.Response) {
    await dbConnect();

    const user = await User.create(req.body); 
    res.status(200).json({ user })
}