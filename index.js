import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import "./src/database/dbConnection";
import platosRouter from "./src/routes/platos.routes";
import usuariosRouter from "./src/routes/usuarios.routes";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Puerto:" + app.get("port"));
});

app.use(cors());
app.use(express.json());

app.use("/apiRestFood", platosRouter);
app.use("/apiRestFood/auth", usuariosRouter);
