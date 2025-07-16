// const express = require('express')

import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser"

// import { connect } from "mongoose";
import { db } from "./lib/db.js";
import { app,server } from "./lib/socket.js"
import cors from "cors"


dotenv.config()

app

const PORT= process.env.PORT;

app.use(express.json()) // to extract the data in json out of body
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true  // allow the cookies / authorization headers to be sent along with the request
}))


app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

server.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
    db()
})