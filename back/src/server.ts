import express from "express";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import "express-async-errors";
import helmet from "helmet";
import compression from "compression";

// import injection config from tsyringe
import "./shared/container";
import swaggerDocument from "./swagger.json";
import { router } from "./routes";
import { traverseErrors } from "./middlewares/traverseErrors";

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);
app.use(helmet.apply);
app.use(compression);

// middleware to handle error exceptions
app.use(traverseErrors);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
