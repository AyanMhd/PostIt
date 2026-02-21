import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import BlogRoutes from "./routes/blog.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server started");
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", BlogRoutes);

export default app;
