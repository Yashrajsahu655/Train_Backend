import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;



export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied, no token provided" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied, invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in environment variables
    req.user = decoded; // Attach the decoded payload to the request

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
}


export const generateToken = async(payload)=>{
    const token = jwt.sign(payload,JWT_SECRET);
    return token;
}



