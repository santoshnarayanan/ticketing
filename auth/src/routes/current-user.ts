import express from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/req-auth";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send(req.currentUser || null);
});

export { router as currentUserRouter };
