import express from "express";
import cors from "cors";
import CompanyX from "./routes/CompanyX.mjs";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/CompanyX", CompanyX);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});