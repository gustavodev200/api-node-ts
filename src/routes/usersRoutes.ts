import { Router, Request, Response } from "express";
import { CreateUserController } from "../controllers/create-user/create-user";
import { GetUsersController } from "../controllers/get-users/get-users";
import { MongoCreateUserRepository } from "../repositories/create-user/mongo-create-user";
import { MongoGetUsersRepository } from "../repositories/get-users/mongo-get-users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();

  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

router.post("/", async (req: Request, res: Response) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();

  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export default router;
