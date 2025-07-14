import {Server} from "socket.io"
import express from "express"
import http from "http"

const app =express()

const server =http.createServer(app)

const io = new Server(server,{
    cors: {
        origin : ["http://localhost:3000"]
    }
})


io.on("connection",(socket)=>{
    console.log("user connects : ",socket.id)

    socket.on('disconnect',()=>{
        console.log('user disconnected', socket.id);
    })
})


export {io,app,server}