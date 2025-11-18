import mongoose from "mongoose";
import { createClient } from "redis";

export const connectMongo = () => {
  const URI = "mongodb://localhost:27017/sheetvault";

  mongoose.connection.on('open', () => {
    console.log("Conectado ao MongoDB!")
  });

  const cnn = mongoose.connect(URI);

  return cnn;
}

export const connectRedis = () => {
  const client = createClient();

  client.on('error', e => console.error(`Erro de conexão com o Redis: ${e}`));

  return client;
}