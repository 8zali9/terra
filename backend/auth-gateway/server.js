const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const apis = require('./apis/registeredRoutes')
const port = process.env.PORT
const { Server } = require('socket.io');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
);

app.use(cookieParser());
app.use(apis)

const server = app.listen(port, () => {
  console.log('Auth gateway with socket running on .',port);
});
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const socketIdMap = {}; // Set to store online users

//connection

io.on('connection', async (socket) => {
  const token = socket.handshake.auth.token;
  console.log('user connected with token: ', token);
  const socketID = socket.id;
  socketIdMap[token] = socketID;

  // Broadcast online users to all clients
  io.emit('onlineUsers',Object.keys(socketIdMap));

  socket.on('joinChatRoom', ({sender_id,receiver_id}) => {
    const receiverSocketId = socketIdMap[receiver_id];
    console.log(receiver_id);
    io.to(receiverSocketId).emit('newNotification',{sender_id});
  });

  socket.on('sendMessage',({sender_id,receiver_id,message})=>{
    console.log({sender_id,receiver_id,message});
    const receiverSocketId = socketIdMap[receiver_id];
    const senderSocketId = socketIdMap[sender_id]
    io.to(receiverSocketId).emit('newMessage',{sender_id,receiver_id,message});
    io.to(senderSocketId).emit('newMessage',{sender_id,receiver_id,message});
  })
});