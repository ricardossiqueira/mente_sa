import express, { Request, Response, Router } from "express";

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());

const router = Router();

router.get("/", (req: Request, res: Response) =>
  res.status(200).json({ message: "Hello World" })
);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
