import { Router } from "express";

import { postPalestrante, getPalestrante } from "../controllers/palestranteController.js";

// Helpers

const router = Router()

//localhost:3333/eventos/
router.post("/palestrantes", postPalestrante)
router.get("/palestrantes", getPalestrante)

export default router