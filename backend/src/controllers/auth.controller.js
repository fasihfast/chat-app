import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {generateToken} from '../lib/utils.js'
import cloudinary from 'cloudinary'

  export const signup = async (req, res) => {
  const { email, fullName, password , pin} = req.body;

  try {
    
    if (!email || !fullName || !password || !pin) {
        console.log("Headers:", req.headers);
        console.log(req.body)
      return res.status(400).json({ message: 'Provide complete information' });
    }

    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

   if (typeof pin !== 'string' || !/^\d{6}$/.test(pin)) {
  return res.status(400).json({ message: 'Pin must be exactly 6 digits' });
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
      password: hashedPassword,
      pin
    });

    await newUser.save();

    // ✅ Generate token and send response
    generateToken(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      pin: newUser.pin
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
            profilePic : user.profilePic,
            pin : user.pin
        })

    } catch (error) {
        console.log('Error in logIn Controller ',error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const logout = (req,res) => {
try {
    res.cookie("jwt","",{maxAge:0,sameSite:"None"})
    res.status(200).json({message: 'Successfully Logged Out'})
} catch (error) {
    console.log('Error in logOut Controller ',error.message)
    res.status(500).json({message:"Internal Server Error"})
}

}


export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkauth = async (req,res) => {
    try{
        res.status(200).json(req.user);
        // console.log(req.user)
    }catch(error){
        console.log('Error in the checkauth controller',error.message);     res.status(500).json({message:"Internal Server Error"})
        res.status(500).json({message:"Internal Server Error"})
    }
}




