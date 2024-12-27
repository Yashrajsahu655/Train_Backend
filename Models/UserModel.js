import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    mobile : {
        type : String,
        unique : String,
        required: true
    },
    role:{
        type:String,
        enum : ["admin","user"],
        default:"user",
        required: true
    }
    
},
{
    timestamps : true
}
)

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
       
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});



UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User',UserSchema);

export default User;