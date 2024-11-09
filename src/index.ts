import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"
import { Chat } from "./types";
import { getAllChat, insertChat } from "./db";

const app: Express = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        credentials: false
    }
})

const port = 3003

app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}))

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

io.on('connection', async (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log("client disconnected")
    })
    
    socket.on('get-chats', async (fn: (chats: Chat[]) => void) => {
        fn(await getAllChat())
    })
    
    socket.emit('init-chats', await getAllChat())
    
    socket.on('chat', async (chat: Chat) => {
        try {
            const newChat = await insertChat(chat)
            io.emit('chat', newChat)
        }
        catch (e) {
            console.log(e)
        }
    })
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});