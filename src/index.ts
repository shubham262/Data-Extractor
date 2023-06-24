import express from "express";
import { GarlandCityRouter } from "./routes/routes";
const app = express();

app.use(express.json());
app.use(GarlandCityRouter);
app.listen(3000, () => {
  console.log(`⚡️Server is running at https://localhost:3000`);
});
