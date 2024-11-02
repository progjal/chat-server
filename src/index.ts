import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"

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

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log("client disconnected")
    })
    
    socket.emit('message', "Hello...")
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});