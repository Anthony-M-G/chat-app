import { MessagesService } from "../services/messages.service";

export class MessagesController {
  constructor(
    readonly messagesService: MessagesService,
    readonly io: any
  ) {
    this.messagesService = messagesService;
    this.io = io;
  }

  onConnection = async (socket: any): Promise<void> => {
    console.log("User connected");
    if (!socket.recovered) {
      // Si no se ha recuperado la conexión se envían los mensajes al cliente
      const messages = await this.messagesService.getAll(
        socket.handshake.auth.serverOffset
      );
      messages.forEach((msg) => {
        const { message_id, content, message_time } = msg;
        socket.emit("init", { message_id, content, message_time }); // Se listan los mensajes solo al nuevo cliente
      });
    }

    socket.on("chat message", async (data: any) => {
      console.log("Nuevo mensaje");
      const { value } = data;
      const { message_id, content, message_time } =
        await this.messagesService.addMessage(value);
      this.io.emit("new-message", { message_id, content, message_time }); // Se envía el nuevo mensaje a todos los clientes
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  };
}
