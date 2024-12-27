import User from "../Models/UserModel.js";
import { verifyToken,generateToken } from "../jwt/jwt.js";


export const loginController = async (req,res)=>{
    try {
      const {email,password} = req.body;
       
      const user = await User.findOne({email:email});

      if(!user){
          return res.status(400).send("user does'nt exists");
      }
      
      const isMatch = user.matchPassword(password);

       if(!isMatch){
            return res.status(400).send("invalid password");
       }
       const payload = {
         id:user.id,
         name:user.name
       }
       const token = await generateToken(payload);

       return res.status(200).json({message:"login successfully",token:token});

    } catch (error) {
       return res.status(500).send("internal server error",error.message);
    }
}

export const signupController = async(req,res)=>{
    
    try {
     const {name,email,password,mobile} = req.body;
     console.log(name);
     
     
      
     if(!name || !email || !password || !mobile){
         return res.status(400).json({message:"Please fill all the fields"})
     }
 
     const user = await User.findOne({email:email});
 
     console.log(user);
 
     if(user){
        return res.status(400).send("User already exists");
     }
     else{
         
         const newUser = new User({name:name,email:email,password:password,mobile:mobile});
         await newUser.save();
         const token = await generateToken({
            id:newUser.id,
            name:newUser.name
         }
         )
         console.log(token);
         

        return res.status(200).json({user:newUser,token:token});
     }
     
    } catch (error) {
      return res.status(500).json({ error: "Internal server error", details: error.message });
    }
  
 }

export const GetUserController = async(req,res)=>{

    try {
        const {id} = req.user;
        const user = await User.findById(id);
    
        
        if(!user){
            return res.status(404).json({meassage:"User not found"});
        }
        return res.status(200).json({user:user});

    } catch (error) {
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
}


export const deleteUsercontroller = async(req,res)=>{
    try {
         const {email} = req.body;
            
         if(!email){
            return res.status(400).json({message:"invalid email"})
         }

         const user = await User.findOne({email:email});
         if(!user){
            return res.status(400).json({message:"user doesn't exist"});
         }
        
         const RemovableUser = await User.deleteOne({email:email});

         return res.status(200).json({user:user});
    } catch (error) {
         return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};