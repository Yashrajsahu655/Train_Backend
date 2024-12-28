import Booking from "../Models/BookingModel.js";
import Train from "../Models/TrainModel.js";
import User from "../Models/UserModel.js";




const generateUniqueNumber = async (model, field, min, max) => {
    let uniqueNumber;
    let isUnique = false;
    while (!isUnique) {
        uniqueNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a number within the specified range
        const existingRecord = await model.findOne({ [field]: uniqueNumber });
        isUnique = !existingRecord; // Check if the number already exists
    }
    return uniqueNumber;
};

export const BookTicket = async (req, res) => {
    try {
        const { train_number } = req.query;
        const { id } = req.user;

        const train = await Train.findOne({ train_number: train_number });
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }

        if (train.Seats > 0) {
            // Generate unique seat number
            const seatNumber = await generateUniqueNumber(Booking, 'seatNumber', 1, 99); // Assuming seat numbers are from 1 to 99
            // Generate unique PNR
            const pnr = await generateUniqueNumber(Booking, 'pnr', 1000000000, 9999999999); // PNR between 1000000000 and 9999999999

            // Create the booking
            const booking = new Booking({
                userId: user.id,
                trainId: train.id,
                bookingDate: new Date(Date.now()).toLocaleString(),
                status: "confirm",
                seatNumber: seatNumber,
                fare: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
                pnr: pnr
            });

            // Save the booking
            await booking.save();

            // Reduce the number of seats directly
            train.Seats -= 1; // Reduce by 1 seat per booking
            await train.save();

            const ticket = {
                booking: {
                    bookingDate: booking.bookingDate,
                    status: booking.status,
                    seatNumber: booking.seatNumber,
                    fare: booking.fare,
                    pnr: booking.pnr
                },
                userName: user.name,
                trainName: train.train_name
            };

            return res.status(200).json({ message: "Ticket booked successfully", booking: ticket });
        }
        return res.status(200).json({ message: "All seats are filled" });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

export const getTicketByPNR = async(req,res)=>{
       try {
        const {pnr} = req.query;
          
        const ticket = await Booking.findOne({pnr:pnr});

        if(!ticket){
            return res.status(404).json({ message: "Ticket not found" });
        }
         
        return res.status(200).json({ message: "Ticket found", ticket: ticket });
       } catch (error) {
        return res.status(404).json({ error:error.message });
       }
}

export const cancelTicket = async(req,res)=>{
    try {
        const {pnr} = req.query;
          
        const ticket = await Booking.findOne({pnr:pnr});

        if(!ticket){
            return res.status(404).json({ message: "Ticket not found" });
        }

        await Booking.deleteOne({pnr});
         
        return res.status(200).json({ message: "Ticket cancelled", ticket: ticket });
       } catch (error) {
        return res.status(404).json({ error:error.message });
       }
}