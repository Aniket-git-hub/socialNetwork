require('dotenv').config()
const express = require("express")
const app = express();
const PORT = 3000 || process.env.PORT
const cors = require("cors")
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// database configuration
const db = require("./config/db.config.js")
mongoose.connect(db.mongoURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("connected to mongodb"))
.catch(err=>console.log(err))

const http = require('http').Server(app)
const io = require('socket.io')(http)

 io.on("connection", (socket) => {
     console.log('a user connected')
    // greet the new user
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' })
})

http.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
    console.log(`https://localhost:${PORT}/`)
})

// use the routes
app.use('/', userRoutes)