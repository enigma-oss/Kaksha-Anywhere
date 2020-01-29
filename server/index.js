const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const router = require("./router");

app.use(cors());
app.use(router);

io.on("connection", client => {
  console.log("client connnected...");
  client.on("drawing", data => {
    client.broadcast.emit("drawing", data);
  });

  client.on("join", ({ name, room }, callback) => {
    console.log(name, room);
    const { error, user } = addUser({ id: client.id, name, room });

    if (error) return callback(error);

    client.join(user.room);

    client.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`
    });
    client.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  client.on("sendMessage", (message, callback) => {
    const user = getUser(client.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  client.on("disconnect", () => {
    const user = removeUser(client.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

http.listen(4000);
