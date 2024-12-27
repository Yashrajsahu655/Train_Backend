import Train from '../Models/TrainModel.js';



export const createTrain = async (req, res) => {
  try {
      const { train_name, train_number,Stations } = req.body;  

      // Check for missing fields
      if (!train_name || !train_number) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Check if a train with the same train number 
      const existingTrainByNumber = await Train.findOne({ train_number });
      

      if (existingTrainByNumber) {
          return res.status(409).json({ message: "Train number already exists" });
      }

     

      // Create a new train instance
      const newTrain = new Train({
          train_name,
          train_number,
          Stations
      });

      // Save the new train to the database
      await newTrain.save();

      // Return the newly created train
      return res.status(201).json({ train: newTrain });
      
  } catch (error) {
      // Handle errors and return a response
      console.error(error);  // Log the error for debugging
      return res.status(500).json({ error: "Internal server error" });
  }
};



// Function to find trains
const findTrainsFunction = async (source, destination) => {
  try {
      
      const trains = await Train.find({
          Stations: { $all: [new RegExp(source, 'i'), new RegExp(destination, 'i')] }
      });
      
      const validtrains = trains.filter(train =>{
          const fromStation = train.Stations.findIndex(src => src.toLowerCase() === source.toLowerCase());
          const toStation = train.Stations.findIndex(dest => dest.toLowerCase() === destination.toLowerCase());

          return fromStation != -1 && toStation != -1 && fromStation<toStation;
      })

      return validtrains;


  } catch (error) {
      throw new Error("Internal server error"); 
  }
}


export const FindTrain = async (req, res) => {
  try {
      const { source, destination } = req.body;

      if (source === destination) {
          return res.status(400).send("Source and destination can't be the same.");
      }

      const trains = await findTrainsFunction(source, destination); // Call the find function
      

      if (!trains || trains.length === 0) { // Check if trains are found
          return res.status(404).send("No trains found.");
      }
      const train = trains.map(train => train.train_name);
       
       
      return res.status(200).json({ trains:train }); // Return found trains in response
  } catch (error) {
      return res.status(500).json({ error: error.message }); // Handle any other errors
  }
}




export const deleteTrain = async(req,res) =>{
       const {train_number} = req.query;
       try {
           const train = await Train.findOne({train_number:train_number});
             if(!train){
               return res.status(404).json({message:"no such train found"})
             }
            
             await Train.deleteOne({train_number:train_number});

             return res.status(200).json({train:train});

       } catch (error) {
        return res.status(404).json({error:error.message});
       }
}

