import { Router } from "express";

import { getMaisPopular, postFeedback, getPalestranteMaisAtivo } from "../controllers/feedbackController.js";

const router = Router()

//localhost:3333/eventos/
router.post('/feedback', postFeedback)
router.get('/mais-popular', getMaisPopular)
router.get('/palestrante-mais-ativo', getPalestranteMaisAtivo)


export default router;