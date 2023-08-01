import express from "express";
import cors from "cors";
import CompanyY from "./routes/CompanyY.mjs";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/CompanyY", CompanyY);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});