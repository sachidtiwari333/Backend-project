import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dns from 'node:dns/promises'
dns.setServers(['8.8.8.8','1.1.1.1'])
const app = express();


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended : true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRoute from './routes/user.route.js'

app.use('/api/v1/user', userRoute)

export {app}