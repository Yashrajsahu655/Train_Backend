import { Router } from "express";
import { BookTicket,getTicketByPNR,cancelTicket } from "../Controllers/bookingController.js";
import {generateToken,verifyToken} from '../jwt/jwt.js'

const router = Router();


router.post('/book',verifyToken,BookTicket);
router.get('/getTicketByPNR',verifyToken,getTicketByPNR);
router.delete('/cancel',verifyToken,cancelTicket);

export default router;