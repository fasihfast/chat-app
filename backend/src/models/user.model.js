import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    
        email: {

            type:String,
            required: true,
            unique: true
        },

        fullName: {
            type: String,
            required:true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        profilePic: {
            type: String,
            default: ""
        },

        pin : {
            type :String,
            required : true,
            minlength : 6,
            maxlength : 6,
            
        }

    },

    {
        timestamps : true
    },

);

const User = mongoose.model('User',userSchema); // User should be singluar and U should be capital

export default User;