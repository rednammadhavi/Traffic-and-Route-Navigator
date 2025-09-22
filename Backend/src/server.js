import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})

import connectDB from "./db/index.js"
import { app } from './app.js'
import { createServer } from 'http'
import { Server as IOServer } from 'socket.io'

const port = process.env.PORT || 5000
const httpServer = createServer(app)

const io = new IOServer(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST']
    }
})

app.locals.io = io

io.on('connection', (socket) => {
    console.log('socket connected', socket.id)

    socket.on('joinRouteRoom', (roomId) => {
        socket.join(roomId)
    })

    socket.on('leaveRouteRoom', (roomId) => {
        socket.leave(roomId)
    })

    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id)
    })
})

connectDB()
    .then(() => {
        httpServer.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.log('MONGO Connection Failed!!', error)
        process.exit(1)
    })
