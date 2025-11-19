import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByUsername,
  getUserLogin,
} from "../services/users.js";

export const userRoutes = (app) => {
  app.get("/api/users", async (_, res) => {
    return res.json(await getUsers());
  });

  app.get("/api/users/email", async (req, res) => {
    return res.json(await getUserByEmail(req.query));
  });

  app.get("/api/users/username", async (req, res) => {
    return res.json(await getUserByUsername(req.query));
  });

  app.get("/api/users/:id", async (req, res) => {
    return res.json(await getUserById(req.params.id));
  });

  app.post("/api/users", async (req, res) => {
    const new_user = await createUser(req.body);
    return res.status(200).json(new_user);
  });

  app.patch("/api/users/:id", async (req, res) => {
    const updated_user = await updateUser(req.params.id, req.body);
    return res.json(updated_user);
  });

  // app.delete("/api/users/:id", async (req, res) => {
  //   const deleted_user
  // });
};
