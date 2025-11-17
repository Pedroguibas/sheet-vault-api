import mongoose from "mongoose";

export const connect = () => {
  const URI = "mongodb://localhost:27017/sheetvault";

  mongoose.connection.on('open', () => {
    console.log("Conectado ao MongoDB!")
  });

  const cnn = mongoose.connect(URI);

  return cnn;
}
