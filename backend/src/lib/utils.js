import jwt from 'jsonwebtoken'

export const generateToken= (userid,res) =>{
    const token = jwt.sign({userid},process.env.JWT_KEY,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httponly: true,
        sameSite: "None",
        // secure: process.env.NODE_ENV !== 'development'
        secure: true
    })

    return token;
}