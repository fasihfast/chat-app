import express from "express"
import { protectRoute } from "../middlewares/protectRoute.middleware.js"
import { getUserForSideBar,getMessages ,sendMessage} from "../controllers/message.controller.js"

const router=express.Router()

router.get('/user',protectRoute,getUserForSideBar)
router.get('/:id',protectRoute,getMessages)
router.post("/send/:id", protectRoute, sendMessage);


export default router
