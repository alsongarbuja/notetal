import dbConnect from "../../../lib/server";
import Express from "express";
import User from "../../../models/User";

export default async function handler(req: Express.Request, res: Express.Response) {
    await dbConnect();
    const { email, password } = req.body;

    const user = await User.findOne({ email }); 
    if(!user) {
        res.status(400).json({ success: false, message: "Email not correct" });
        return;
    }  
    if(!user?.isPasswordMatch(password)){
        res.status(400).json({ success: false, message: "Password not correct" });        
        return;
    }

    res.status(200).json({ user })
}