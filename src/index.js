import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit:'20kb'}));
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'))
app.use(cookieParser);

connectDB()


.then(()=>{
    app.listen(process.env.PORT || 4000, (req,res)=>{
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((error)=>{
    console.log(`MONGODB connection failed !!! ${error}`);
    
})
