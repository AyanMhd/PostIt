import {Navigate} from "react-router-dom"; 
import useAuth from "../hooks/useAuth";
 
//verify the user
function ProtectedRoute({children}){ 
    const {user} = useAuth();  
     
    //if the user isnt logged in,redirect to login
    if(!user){ 
        return <Navigate to = "/login" replace />;
    }
    return children;
}

export default ProtectedRoute;