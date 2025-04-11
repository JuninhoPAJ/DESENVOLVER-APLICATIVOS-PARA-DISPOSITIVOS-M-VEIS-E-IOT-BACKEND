import express from "express";
import cors from "cors";
import UserRouter from "./src/routers/UserRouter.js";
import ProductRouter from "./src/routers/ProductRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";


const app = express();
const server = http.createServer(app);
const ws = new WebSocketServer({ server });

const clients = new Set()

ws.on('connection', (client) => {
  clients.add(client)
  client.on('message', (message) => {
    const msg = message.toString()
    for (let c of clients) {
      if (c.readyState === WebSocketServer.OPEN) {
        c.Send(msg)
      }
    }
  });
  client.on('close', () => {
    clients.delete(client)
    console.log('Client disconnected successfully');
  })
});


app.use(express.json());
app.use(cors());
app.use("/api", UserRouter);
app.use("/api", ProductRouter);
dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});