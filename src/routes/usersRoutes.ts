import { Router, Request, Response } from "express";
import { GetUsersController } from "../controllers/get-users/get-users";
import { MongoGetUsersRepository } from "../repositories/get-users/mongo-get-users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

export default router;
