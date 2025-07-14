// const express = require('express')

import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser"

// import { connect } from "mongoose";
import { db } from "./lib/db.js";
import { app,server } from "./lib/socket.js"


dotenv.config()

app

const PORT= process.env.PORT;

app.use(express.json()) // to extract the data in json out of body
app.use(cookieParser())


app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

server.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
    db()
})