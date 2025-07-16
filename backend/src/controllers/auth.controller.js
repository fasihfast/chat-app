import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {generateToken} from '../lib/utils.js'
import cloudinary from 'cloudinary'

  export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    
    if (!email || !fullName || !password) {
        console.log("Headers:", req.headers);
        console.log(req.body)
      return res.status(400).json({ message: 'Provide complete information' });
    }

    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

   
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // ✅ Generate token and send response
    generateToken(newUser._id, res);
    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic
    });

  } catch (error) {
    console.error('Error in signUp controller:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
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
            fullName : user.fullName,
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




