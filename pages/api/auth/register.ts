import dbConnect from "../../../lib/server";
import Express from "express";
import User from "../../../models/User";
import { jsonify } from "../../../helpers/backend/api/jsonify";

export default async function handler(req: Express.Request, res: Express.Response) {
    await dbConnect();

    const users = await User.findOne({ email: req.body.email });

    if(users) {
        res.status(400).json(jsonify({message: "Email already taken"}, false));
        return;
    }

    const user = await User.create(req.body); 
    res.status(200).json(jsonify(user))
}