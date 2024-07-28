import query from "./database";

export class MessagesRepository {
  // Devuelve los resultados de la base de datos
  getAll = async (lastIdMessage: number): Promise<any[]> => {
    const allMessages: any[] = await query(
      "SELECT * FROM messages WHERE message_id > $1",
      [lastIdMessage]
    );
    return allMessages;
  };

  // Añade un nuevo mensaje y devuelve el resultado en bruto de la base de datos
  addMessag = async (message: string): Promise<any[]> => {
    return await query(
      "INSERT INTO messages(content, message_time) VALUES ($1, NOW()) RETURNING *",
      [message]
    );
  };
}
