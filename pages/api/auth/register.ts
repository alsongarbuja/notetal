import dbConnect from "../../../lib/server";
import Express from "express";
import User from "../../../models/User";
import { jsonify } from "../../../helpers/backend/api/jsonify";
import { apiError } from "../../../helpers/backend/utils/apiError";

export default async function handler(req: Express.Request, res: Express.Response) {
    await dbConnect();

    const users = await User.findOne({ email: req.body.email });

    if(users) {
        res.status(400).json(jsonify({email: "Email already taken"}, false));
        return;
    }
    
     await User.create(req.body).then(data => {
        res.status(200).json(jsonify(data))
     }).catch(err => {
        const error = apiError(err)
        res.status(400).json(jsonify(error, false));
    });
}