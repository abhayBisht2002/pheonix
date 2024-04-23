import express from "express";
// Controllers
import { getPetrolPrice } from "../controllers/petrol.controller";

export default (router: express.Router) => {
  router.get(
    "/petrol-price/assam",
    (req: express.Request, res: express.Response) => {
      return res.json({ message: "This is pheonix's puppeteer assignment!" });
    }
  );
  router.get("/petrol-price/assam", getPetrolPrice);
};
