import { Router, Request, Response } from "express";
import { CreateUserController } from "../controllers/create-user/create-user";
import { DeleteUserController } from "../controllers/delete-user/delete-user";
import { GetUserByIdController } from "../controllers/get-users-by-id/get-users-by-id";
import { GetUsersController } from "../controllers/get-users/get-users";
import { UpdateUserController } from "../controllers/update-user/update-user";
import { MongoCreateUserRepository } from "../repositories/create-user/mongo-create-user";
import { MongoDeleteUserRepository } from "../repositories/delete-user/mongo-delete-user";
import { MongoGetUserByIdRepository } from "../repositories/get-users-by-id/mongo-get-users-by-id";
import { MongoGetUsersRepository } from "../repositories/get-users/mongo-get-users";
import { MongoUpdateUserRepository } from "../repositories/update-user/mongo-update-user";

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const mongoGetUserByIdRepository = new MongoGetUserByIdRepository();
  const getUserByIdController = new GetUserByIdController(
    mongoGetUserByIdRepository
  );

  const { body, statusCode } = await getUserByIdController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

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

router.patch("/:id", async (req: Request, res: Response) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository
  );

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();
  const deleteUserControler = new DeleteUserController(
    mongoDeleteUserRepository
  );

  const { body, statusCode } = await deleteUserControler.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default router;
