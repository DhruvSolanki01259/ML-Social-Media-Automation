import express from "express";
import {
  addSocials,
  login,
  logout,
  signup,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/add-socials", addSocials);

export default router;
