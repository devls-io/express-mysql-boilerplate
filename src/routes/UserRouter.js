import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const router = Router()

const userController = new UserController()

// Arrow function para garantir o contexto do this
router.get('/users', (req,res)=> userController.getAll(req,res))

router.get('/users/:id', (req,res)=> userController.getById(req,res))

router.post('/users', (req,res)=> userController.create(req,res))

router.put('/users/:id', (req,res)=> userController.update(req,res))

router.delete('/users/:id', (req,res)=> userController.delete(req,res))

export default router