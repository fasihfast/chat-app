import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {generateToken} from '../lib/utils.js'
import cloudinary from 'cloudinary'

export const signup = async (req,res) => {
    const {email,fullname,password}=req.body;
    try {
        
        if(!email || !fullname || !password){
            res.status(400).json({message:'Provide complete information'})
        }

        if (password.length < 6){
            return res.status(400).json({message:"Password must be atleast of 6 characters"})
        }

        const user= await User.findOne({email})

        if(user){
            return res.status(400).json({message:"User already exist"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })


        if(newUser){
            //generate jwt token

            generateToken(newUser._id,res);
            await newUser.save()

            res.status(201).json({
                _id : newUser._id,
                fullname : newUser.fullname,
                email : newUser.email,
                profilePic : newUser.profilePic
            })
        }else{
            res.status(400).json({message:"Invalid User data provided"})
        }

    } catch (error) {
        console.log('Error in signUp controller', error.message)
        res.status(500).json({message:'Internal server error'})

    }
};

export const login = async (req,res) =>{
    const {email,password} =req.body;
    try {

        if(!email || !password){
            res.status(400).json({message:"Email or Password missing"})
        }

        const user = await User.findOne({email})

        if(!user){
            res.status(400).json({message:'Invalid Credentials'})
        }

        const isPass=await bcrypt.compare(password,user.password)

        if(!isPass){
            res.status(400).json({message:"Invalid Credentials"})
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
            profilePic : user.profilePic
        })

    } catch (error) {
        console.log('Error in logIn Controller ',error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const logout = (req,res) => {
try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message: 'Successfully Logged Out'})
} catch (error) {
    console.log('Error in logOut Controller ',error.message)
    res.status(500).json({message:"Internal Server Error"})
}

}


export const updateProfile = async(req,res) =>{
    const {profilePic} =req.body;
    const userid = req.user._id;

    try{

        if(!profilePic){
            return res.status(400).json({message:'Profile Pic not provided'})
        }
        
        
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
        userid,{profilePic: uploadResponse.secure_url},
        {new : true}
    )
    }catch(error){
        console.log('Error in the updateProfile',error.message);
        res.status(500).json({message:"Internal Server Error"})

    }



}

export const checkauth = async (req,res) => {
    try{
        res.status(200).json(req.user);
        // console.log(req.user)
    }catch(error){
        console.log('Error in the checkauth controller',error.message);     res.status(500).json({message:"Internal Server Error"})
        res.status(500).json({message:"Internal Server Error"})
    }
}




