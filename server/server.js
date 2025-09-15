import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhook.js'
import { clerkMiddleware } from '@clerk/express'
import instructorRouter from './routes/instructorRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoutes.js'
import userRouter from './routes/userRoutes.js'

const app= express()

await connectDB()
await connectCloudinary()

app.use(cors())

app.use(clerkMiddleware())

app.get('/', (req,res)=>res.send("API Working"))

app.post('/clerk', express.json(), clerkWebhooks)

app.use('/api/courses',express.json(),courseRouter)

app.use('/api/user', express.json(), requireAuth, userRouter)
app.use('/api/instructor', express.json(), requireAuth, instructorRouter)

app.post('/stripe', express.raw({type:'application/json'}), stripeWebhooks)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ success: false, message: "Server error", error: err.message });
});
