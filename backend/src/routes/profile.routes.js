import express from "express";
import { addSocials } from "../controllers/profile.controllers";

const router = express.Router();

router.post("/add-socials", addSocials);

export default router;
