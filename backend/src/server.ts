import express, { json } from "express";
import cors from "cors";
import tipRoutes from "./routes/tip.routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(json());

app.use("/api/tips", tipRoutes);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
