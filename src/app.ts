import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "http";
import { MessagesRepository } from "./repository/messages.repository";
import { MessagesService } from "./services/messages.service";
import { MessagesController } from "./controller/messages.controller";

function init(messagesService: MessagesService) {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    connectionStateRecovery: {
      maxDisconnectionDuration: 1200,
    },
    cors: {
      origin: "*",
    },
  });
  const messagesController = new MessagesController(messagesService, io);
  io.on("connection", messagesController.onConnection);

  app.use(logger("dev"));
  app.get("/", (_req, res) => {
    res.sendFile(process.cwd() + "/client/index.html");
  });

  httpServer.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
}

init(new MessagesService(new MessagesRepository()));
