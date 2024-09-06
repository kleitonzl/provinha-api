import { Router } from "express";

import { postInscricao, getParticipanteInscricoes } from "../controllers/inscricaoController.js";

const router = Router()

//localhost:3333/eventos/palestrantes
router.post('/inscrever', postInscricao)
router.get('/meus-eventos/:participanteId', getParticipanteInscricoes)

export default router;