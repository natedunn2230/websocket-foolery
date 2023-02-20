import express, { Express, Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const port = 5001;
app.use(cors());

const people = [
  {
    name: "Jake",
    age: 32,
  },
  {
    name: "Kim",
    age: 29,
  },
  {
    name: "Ben",
    age: 35,
  },
  {
    name: "Randy",
    age: 28,
  },
  {
    name: "Josh",
    age: 27,
  },
  {
    name: "Eli",
    age: 24,
  },
  {
    name: "Amber",
    age: 27,
  },
];

setInterval(() => {
  io.emit("fetch-data", { url: "http://localhost:5001/person" });
}, 3000);

io.on("connection", (socket) => {
  console.log("connection recieved");
});

app.get("/person", (req: Request, res: Response) => {
  res.send({ person: people[Math.floor(Math.random() * people.length)] });
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
