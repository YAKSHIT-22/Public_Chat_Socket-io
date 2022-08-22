// const express = require("express");
// //importing express
// const app = express();
// //assigning express
// const server = require("http").createServer(app);
// //creating htpp server and attaching it to express app
// const io = require("socket.io")(server);
// //importing socket io
const port = process.env.PORT || 3000

// //static files

// app.use(express.static("public"));
// //accessing static files from public using middleware

// app.set("view engine", "ejs");
// //making ejs template as view template on express server

// app.get("/", (req, res) => {
//   res.render("index");
// });
// //if we get a get request we have to route to that page as render is used to render the view and send it to client on request
// const users = {}
// io.on("connection", (socket) => {
//   socket.on("join", username => {
//     if (username === null || username === "") {
//         console.log(username);
//         socket.emit("nousername")
//         console.log(users);
//     } else {
//         users[socket.id] = username
//         console.log(users);
//         socket.broadcast.emit("joined_user", username)
//     }
// }) 
//   socket.on("chat_message",data=>{
//     socket.broadcast.emit("chat",{username:users[socket.id],msg:data})
//   })
//   socket.on("disconnect",()=>{
//     socket.broadcast.emit("left",{username:users[socket.id],
//     msg:`${users[socket.id]} left the chat`})
//     delete users[socket.id]
// })
// });
// server.listen(port, () => {
//   console.log("listening on port 3000");
// });
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require('cors')
const io = require("socket.io")(server)
 
// static file
app.use(express.static("public"))
app.use(cors());
app.set("view engine", "ejs")
 
app.get("/", (req, res) => {
    res.render("index")
})
const users = {}
io.on("connection", socket => {
    socket.on("join", username => {
        // TO CHECK IF USERNAME IS EMPTY OR NOT AND IF EMPTY THEN SEND NOUSERNAME EVENT and if not empty then send the join message:-
        if (username == "" || username == null) {
            socket.emit("nousername")
        } else {
            users[socket.id] = username
            console.log(users);
            socket.broadcast.emit("joined_user", username)
        }
        // // CODE IN THE VIDEO
        // users[socket.id] = username
        // console.log(users);
        // socket.broadcast.emit("joined_user", username)
    })
    socket.on("chat_message", data => {
        socket.broadcast.emit("chat", { username: users[socket.id], msg: data })
    })
 
    socket.on("disconnect", () => {
        let username = users[socket.id];
        console.log(`disconnect user ${username}`);
        if (username != undefined) {
 
            socket.broadcast.emit("left", {
                username: users[socket.id],
                msg: `${users[socket.id]} left the chatroom `
            })
            delete users[socket.id]
        }
        console.log(users);
    })
})
 
server.listen(port, () => {
    console.log("Server connected")
})