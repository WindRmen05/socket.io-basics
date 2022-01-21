const {instrument} = require('@socket.io/admin-ui');
const express = require("express");
// const { Socket } = require("socket.io-client");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: ["http://192.168.88.77:3000","http://admin.socket.io/"] },
});
const port = 3000;

app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  res.render("home.ejs");
});

server.listen(port, () => {
  console.log("server running on port " + port);
});

io.on("connect", (socket) => {
  console.log("User connected: " + socket.id);
  socket.on('/test', (data) => {
    console.log(data);
  })

  socket.emit('user_data', {name: "yatin", id: 2});
  // socket.emit('new_user_data', {name: "yatin", id: "4"});

  // socket.on("message", (message, room) => {
  //   if (room === '') {
  //     //message saved to db
  //     socket.broadcast.emit("receive-message", message);
  //   } else {
  //     socket.broadcast.to(room).emit("receive-message", message);
  //   }
  // });

  // socket.on('join-room', (room) => {
  //   socket.join(room);
  // })
});

// instrument(io, {auth: false});
