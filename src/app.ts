import express from "express";
import morgan from "morgan";
import cors from "cors";
import clientRoutes from "./routes/client.routes";
import carRoutes from "./routes/car.routes";
import revisionRoutes from "./routes/revision.routes";

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use("/api/revision", revisionRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/car", carRoutes);

export default app;