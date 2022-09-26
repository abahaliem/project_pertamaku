import express from "express";
import {
    getUser,
    getUserlById,
    createUser,
    updateUser,
    deleteUser
} from "../controller/Users.js";

import {verifyUser, adminOnly} from "../middleware/AuthUser.js"

const router = express.Router();

router.get('/users',verifyUser, adminOnly, getUser);
router.get('/users/:id', verifyUser, adminOnly, getUserlById);
router.post('/users',  verifyUser, adminOnly, createUser);
router.patch('/users/:id',verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);


export default router;

