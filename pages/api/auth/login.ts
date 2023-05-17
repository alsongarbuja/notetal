import dbConnect from "../../../lib/server";
import Express from "express";
import User from "../../../models/User";
import { jsonify } from "../../../helpers/backend/api/jsonify";

export default async function handler(req: Express.Request, res: Express.Response) {
    await dbConnect();
    const { email, password } = req.body;

    const user = await User.findOne({ email }); 
    if(!user) {
        res.status(400).json(jsonify({email: "Email not correct"}, false));
        return;
    }
    if(!(await user.isPasswordMatch(password))){
        res.status(400).json(jsonify({password: "Password not correct"}, false));        
        return;
    }

    res.status(200).json(jsonify(user))
}