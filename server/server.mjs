import express from "express";
import cors from "cors";
import CompanyZ from "./routes/CompanyZ.mjs";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/CompanyZ", CompanyZ);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});