import { MessagesRepository } from "../repository/messages.repository";
interface Message {
  readonly message_id: number; // Entero (clave primaria serial)
  readonly content: string; // Cadena de texto (varchar(255))
  readonly message_time: string; // Timestamp, convertido a Date en JS
}
export class MessagesService {
  constructor(readonly messageRepository: MessagesRepository) {
    this.messageRepository = messageRepository;
  }

  getAll = async (id: number): Promise<Message[]> => {
    try {
      const result: Message[] = (await this.messageRepository.getAll(id)).map(
        (msj: any) => ({
          message_id: msj.message_id,
          content: msj.content,
          message_time: new Date(msj.message_time).toLocaleString("es-CR"), // formatear a hora elegida
        })
      );

      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  addMessage = async (message: string): Promise<Message> => {
    const bd_message = await this.messageRepository.addMessag(message);
    return {
      message_id: bd_message[0].message_id,
      content: bd_message[0].content,
      message_time: new Date(bd_message[0].message_time).toLocaleString(
        "es-CR"
      ),
    };
  };
}
