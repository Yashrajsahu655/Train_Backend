import express from 'express';
import {createTrain,deleteTrain,FindTrain} from '../Controllers/trainController.js'
import { verifyToken } from '../jwt/jwt.js';
import User from '../Models/UserModel.js';


const router = express.Router();


const isAdmin = async(req,res,next)=>{
     const {id} = req.user;
     const user = await User.findById(id);

     if(user.role === "admin"){
         return next();
     }
     return res.status(404).json({message:"users are not allowed to manipulate trains"});
}

router.post('/create',verifyToken,isAdmin,createTrain);
router.delete('/delete',verifyToken,isAdmin,deleteTrain);
router.get('/find',FindTrain);

export default router;
