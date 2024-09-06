import { Router } from "express";

import { postEventos, getEventos, editarEventos, deletarEventos } from "../controllers/eventoController.js";

const router = Router()

//localhost:3333/eventos/
router.post('/criar', postEventos)
router.get('/agenda', getEventos)
router.put('/editar/:evento_id', editarEventos)
router.delete('/cancelar/:evento_id', deletarEventos)


export default router;