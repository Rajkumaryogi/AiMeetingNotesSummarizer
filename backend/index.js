import "dotenv/config";
import express from "express";
import cors from "cors";
import summaryRoutes from "./routes/summaryRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/summary", summaryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
