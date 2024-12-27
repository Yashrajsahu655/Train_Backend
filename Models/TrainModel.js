import mongoose from "mongoose";

const TrainSchema = new mongoose.Schema({
      train_name:{
        type:String,
        unique: true,
        required:true
      },
      train_number:{
        type:Number,
        unique:true,
        required:true

      },
      Stations:{
        type:[String],
        default:[]
      },
      Seats:{
        type:Number,
        default:100
      }
},{
    timestamps:true
}
);


const Train = mongoose.model("Train",TrainSchema);

export default Train;