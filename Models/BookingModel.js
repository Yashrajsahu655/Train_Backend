import mongoose from "mongoose";


const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    trainId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Train',
    },
    bookingDate:{
        type:String,
        default:Date.now
    },
    status:{
        type:String,
        enum:["confirm","pending","cancelled"],
        default:"pending",
    },
    seatNumber:{
        type:Number,
    },
    fare:{
        type:Number,
    },
    pnr:{
        type:Number,
        unique:true,
    }
       
})

const Booking = mongoose.model('Booking',BookingSchema);

export default Booking;