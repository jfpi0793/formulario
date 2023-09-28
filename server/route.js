import { Router } from "express";
import { create, del, get, get1, update } from "./controller.js";

const router = Router()

router.get('/form', get)
router.get('/form/:id', get1)
router.post('/form', create)
router.patch('/form/:id', update)
router.delete('/form/:id', del)

export default router