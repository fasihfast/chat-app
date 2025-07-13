export const getUserForSideBar = async (req,res) =>{
    try {
        const LoggedInUser=req.user._id;
        const filteredUsers = await find({_id:{$ne:LoggedInUser}}).select("-password")
        
        res.status(200).json(filteredUsers)


    } catch (error) {
        console.log('Error in the getUserforSidebar controller',error.message);     res.status(500).json({message:"Internal Server Error"})
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getMessages = async (req,res)=>{
    try {
        const {id:otherUserId} = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[{senderId : myId , receiverId : otherUserId},{senderId : otherUserId , receiverId : myId}]
        })
        
        res.status(200).json(messages)
    } catch (error) {
        console.log('Error in the getMessages controller',error.message);     res.status(500).json({message:"Internal Server Error"})
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const sendMessage = async (req,res) =>{
    try{
           const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //todo socket.io implementation

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}