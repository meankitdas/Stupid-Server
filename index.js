const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected now");
  socket.on("message", ({ message }) => {
    console.log(message);
  });
  socket.on("join_room", (room) => {
    socket.join(room.toString());
    console.log(room);
  });
  socket.on("chat_message", ({ room, message }) => {
    console.log(room)
    console.log(message);
    socket.to(room).emit("chat_messages", {
      message,
    });
  });

  let rm = "N57peieYZIeaL7rlC0TrbTinDQp17Ks9OH8lbYT2We0X39dYN9EIEJn1"

  socket.to(rm).emit("example",{message: "EXAMPLE ON IS WORKING"})
  
});



http.listen(3000, function () {
  console.log("listening on port: http://localhost:3000");
});
