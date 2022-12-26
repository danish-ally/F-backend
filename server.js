const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const db = require('./app/models');
const app = express();

db.sequelize.sync()
  .then(() => {
    console.log("frisles database got Synced");
  })
  .catch((err) => {
    console.log("Failed to sync frisles database: " + err.message);
  });

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', (req, res) => {
  res.json({ message: "Hello welcome to frisles API" });
});

require('./app/routes/login.route.js')(app);
require('./app/routes/interests.route.js')(app);
require('./app/routes/profile.route.js')(app);
require('./app/routes/chest.route.js')(app);
require('./app/routes/produce.route.js')(app);
require('./app/routes/home.route.js')(app);

require("./app/routes/user.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/postLike.routes")(app);
require("./app/routes/postComment.route")(app);
require("./app/routes/postShare.routes")(app);
require("./app/routes/postVoice.routes")(app);

require("./app/routes/specialWord.router")(app)
require("./app/routes/activityType.routers")(app)
require("./app/routes/activity.routes")(app)
require("./app/routes/Chat/chat.routes")(app)
require("./app/routes/Chat/message.routes")(app)
require("./app/routes/Activity/activity.routes")(app)
require("./app/routes/Activity/activityAndUserStatusMapping.routes")(app)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>{
  console.log(`Server listening at port ${PORT}`)
});


// socket io intregate


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user.id == newMessageRecieved.sender.id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
})