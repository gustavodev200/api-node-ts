import express from "express";
import { config } from "dotenv";
import usersRoutes from "./routes/usersRoutes";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const server = express();

  server.use(express.json());

  server.use("/users", usersRoutes);

  const port = process.env.PORT || 8000;

  await MongoClient.connect();

  server.listen(port, () => console.log(`server is running in port: ${port}`));
};

main();
