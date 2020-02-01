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

// Load Posts model
const Chat = require('./models/Chat');

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

  client.on("stroke-change", stroke => {
    client.broadcast.emit("stroke-change", stroke);    
  });

  client.on("clear", (clear) => {
		io.in(clear).emit("cleared", clear);
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

    Chat.find({}, (err, chats) => {
      if (err) {
        console.log(err);
      } else {
        console.log(chats);
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
          chat: chats.map(message => {
            return {user: message.user, text: message.text};
          }),
        });
      }
    });
    
    

    callback();
  });

  client.on("sendMessage", (message, callback) => {
    const user = getUser(client.id);
    console.log(user);
    const date = new Date();
    const messageData = {
      user: user.name,
      text: message,
      date: dateFormat(date)
    };
    chatMessage = new Chat();
    chatMessage.user = messageData.user;
    chatMessage.text = messageData.text;
    chatMessage.date = messageData.date;
    chatMessage.save((function(err){
      if(err)
        throw err;
      else
        console.log("saved!");
    }));
    
    io.to(user.room).emit("message", messageData);
    
    

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

http.listen(process.env.PORT || 4000);
