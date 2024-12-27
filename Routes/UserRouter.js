import { Router } from "express";
import {generateToken,verifyToken} from '../jwt/jwt.js';
import {loginController,signupController,deleteUsercontroller,GetUserController} from '../Controllers/userController.js'


const router = Router();

router.post('/login',loginController);

router.post('/signup',signupController)

router.get('/getUser',verifyToken,GetUserController);


router.delete('/delete',verifyToken,deleteUsercontroller)


export default router;