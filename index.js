const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");
const dateFormat = require("dateformat");

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected..!"))
  .catch(err => console.log(err));

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const router = require("./router");

app.use(cors());
app.use(router);

io.on("connection", client => {
  console.log("client connnected...");

  client.on("drawing", data => {
    const user = getUser(client.id);
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
    console.log(user);
    const date = new Date();
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      date: dateFormat(date)
    });

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

app.listen(process.env.PORT || 4000);
