import { getSheets, createSheet } from "../services/sheets.js";

export const sheetRoutes = (app) => {
  app.post("/api/sheets/", async (req, res) => {
    return res.status(200).json(await createSheet(req.body));
  });

  app.get("/api/sheets/", async (_, res) => {
    return res.json(await getSheets());
  });
};
