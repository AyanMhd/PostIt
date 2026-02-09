const express = require('express');
const app = express(); 
import authRoutes from "./routes/auth.routes.js"; 
import BlogRoutes from "./routes/blog.routes.js"; 

app.use(express.json());

app.get('/',(req,res) => { 
    res.send('Server started');
}) 

app.use("/api/auth",authRoutes);
app.use("api/blogs",BlogRoutes); 

module.exports = app;