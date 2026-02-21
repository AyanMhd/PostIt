import jwt from "jsonwebtoken";
 
const authMiddleware = (req,res,next) => { 
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){ 
            return res.status(401).json({ 
                message : "Unauthorized",
            });
        }
        const token = authHeader.split(" ")[1];
        const jwtSecret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token,jwtSecret); 
        req.user = decoded;
        next();
    }
    catch(error){ 
        return res.status(401).json({
            message : "Not authorized",
            error,
        });
    }
};
export default authMiddleware;