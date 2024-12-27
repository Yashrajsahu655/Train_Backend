import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './Routes/UserRouter.js';
import connectdb from './db.js';
import TrainRoutes from './Routes/TrainRouter.js';


const app = express();
dotenv.config();
connectdb();

app.use(express.json());
app.use('/user',userRoutes);
app.use('/train',TrainRoutes);

app.get('/',(req,res)=>{
    res.send("server started");
})



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
    
})