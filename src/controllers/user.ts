import dbUser from "../models/dbUser";
import bcrypt from 'bcrypt';
import { generateToken } from "./auth";
export async function logout(req,res) {
    if (req.method == "POST"){}
    else{
        res.set("Allow",'POST');
        return res.status(405).json({message: 'Method Not Allowed'});
    }
    res.clearCookie('token');
    res.status(200).send({message:"Logged out successfully"});
}
export async function registerUser(req,res){
    if (req.method=="POST"){}
    else{
        res.set("Allow",'POST');
        return res.status(405).json({message: 'Method Not Allowed'});
    }
    if (!req.body.email||!req.body.password){
        return res.status(400).json({
          message: 'Username or Password missing!'
        });
      }
    const {email,password} = req.body;
    const existingUser = await dbUser.findOne({email:email});
    if (existingUser){
        console.log(existingUser.email,existingUser.password);
        return res.status(400).json({message:"Email already used"});
    }
    const newUser = new dbUser({email:email,password:password,role:"Student"});
    await newUser.save();
    return res.status(200).json({message:"User registered successfully"});
};
export async function loginUser(req,res){
    if (req.method=='POST'){}
    else{
        res.set('Allow', 'POST');
        return res.status(405).json({message: 'Method Not Allowed'});
    }
    if (req.cookies.token){
        return res.status(200).json({
            message: 'Already logged in.',
        });
    }
    if (!req.body.email||!req.body.password){
        return res.status(400).json({
          message: 'Username or Password missing!'
        });
      }
    const {email,password} = req.body;
    const user = await dbUser.findOne({'email':email});;
        if (!user){
            return res.status(401).json({
                message: " User not found!",
            })
        }
        const isPassword = user.password === password;
        if (!isPassword){
            return res.status(401).json({
                message:"Incorrect Password",
            });
        }
        console.log(user.role);
        const token = generateToken({_id:user._id,role:user.role});
        res.cookie('token',token);
        return res.status(200).json({
            message:'login successfully',
        })

}