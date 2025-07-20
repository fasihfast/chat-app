import express from "express"
import { getByName, getUsers } from "../controllers/user.controller.js"

const router=express.Router()


router.get("/support",getUsers);

router.get("/findByName/:fullName",getByName);


export default router;