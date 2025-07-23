import express,{Request,Response} from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import {AuthRoutes}  from "./auth/AuthRoutes"
import { userRoutes } from "./user/userRoutes"
import { LinkRoutes } from "./link/linkRoutes"
import { UserMiddleware } from "./middlewares/userMiddleware"
import { ContentRoutes } from "./content/contentRoutes"
import { TagRoutes } from "./tags/tagRoutes"


dotenv.config()


mongoose.connect(process.env.MONGO_URI as string ).then(() => {console.log("Connection Successfull")}).catch((e) => {console.log("Some error happened " + e)})

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))



app.get("/",(req : Request,res : Response) => {
  res.send("Hey Welcome to MyBrain App.")
})

//Auth Routes
app.use("/api/auth",AuthRoutes)


//User Routes
app.use("/api/user",UserMiddleware,userRoutes)


//Link Routes
app.use("/api/link",UserMiddleware,LinkRoutes)


//Content Routes
app.use("/api/content",UserMiddleware,ContentRoutes)

//Tag Routes
app.use("/api/tags",UserMiddleware,TagRoutes)



app.listen(process.env.PORT,() => {
  console.log(`http://localhost:3000`)
})




