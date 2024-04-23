import express from "express";
import cors from "cors";
import router from "./router";

const app = express();
app.use(cors());

// ROUTES START
app.use("/api", router());
// ROUTES END

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Backend running on port =>", PORT);
});

export default app;
