import express from "express";
import cors from "cors";
import players628 from "./routes/players.mjs";
import teams628 from "./routes/teams.mjs";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/player", players628);
app.use("/team", teams628);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});