import express from "express";
import {
    getArtikel,
    getArtikelById,
    updateArtikel,
    createArtikel,
    deleteArtikel,
} from "../controller/Artikel.js";

import { verifyUser } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/artikel', verifyUser, getArtikel);
router.get('/artikel/:id', verifyUser, getArtikelById);
router.post('/artikel',verifyUser,createArtikel);
router.patch('/artikel/:id', verifyUser, updateArtikel);
router.delete('/artikel/:id',verifyUser, deleteArtikel);


export default router;

