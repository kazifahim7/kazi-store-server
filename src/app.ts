import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import notFound from './app/middleware/notFound'
import globalErrorHandler from './app/middleware/globalErrorhandler'
import router from './app/routes/routes'

const app:Application = express()


// parser 
app.use(express.json())
app.use(cors())

// api 

app.use("/api/v1",router)


app.get('/', (req:Request, res:Response) => {
    res.send('welcome to assignment project...')
})



app.use(notFound)

app.use(globalErrorHandler)

export default app