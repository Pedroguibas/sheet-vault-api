import mongoose from "mongoose";
import { createClient } from "redis";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const connectMongo = () => {
  const URI = "mongodb://localhost:27017/sheetvault";

  mongoose.connection.on("open", () => {
    console.log("Conectado ao MongoDB!");
  });

  const cnn = mongoose.connect(URI);

  return cnn;
};

export const connectRedis = async () => {
  //busca senha do arquivo config
  const data = await readFile(path.join(__dirname, "config.txt"), "utf-8");
  const client = createClient({
    username: "default",
    password: data,
    socket: {
      host: "redis-18758.crce196.sa-east-1-2.ec2.cloud.redislabs.com",
      port: 18758,
    },
  });
  client.on("error", (e) => console.error(`Erro de conexão com o Redis: ${e}`));

  return await client.connect();
};
