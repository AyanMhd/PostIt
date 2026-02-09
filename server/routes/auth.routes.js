import {signup,login} from "../controllers/auth.controller.js";
const express = require('express'); 
const router = express.Router(); 

router.post("signup", signup);
router.post("login", login);

export default router;