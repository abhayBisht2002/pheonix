import express from "express";
const router = express.Router();
// routers import
import petrol from "./petrol.router";

export default (): express.Router => {
  petrol(router);
  return router;
};
