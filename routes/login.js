import { getUserLogin } from "../services/users.js";
import { connectRedis } from "../db/db.js";
import { v4 as uuid } from "uuid";

export const loginRoutes = (app) => {
  app.post("/api/login", async (req, res) => {
    const u = await getUserLogin(req.body);
    try {
      const redis = await connectRedis();

      if (!u) return res.status(401).json({ error: "Credenciais inválidas" });

      const sessionId = uuid();
      const sessionExpireTime = 3600;

      await redis.hSet(`session:${sessionId}`, {
        userId: u._id.toString(),
        username: u.username,
        email: u.email,
      });

      await redis.expire(`session:${sessionId}`, sessionExpireTime);

      res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: sessionExpireTime * 1000,
      });

      redis.close();
      return res.json({ message: "Login efetuado!" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Erro ao iniciar a sessão: " + e });
    }
  });

  app.post("/api/logout", async (req, res) => {
    const sessionId = req.cookies.sessionId;
    const redis = await connectRedis();

    if (sessionId) await redis.del(`session:${sessionId}`);

    res.clearCookie("sessionId");

    redis.close();
    return res.json({ message: "Logout efetuado" });
  });

  app.get("/api/session", async (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId)
      return res.status(401).json({ error: "Sessão não iniciada." });

    const redis = await connectRedis();

    const u = await redis.hGetAll(`session:${sessionId}`);

    redis.close();
    return res.json(u);
  });
};
