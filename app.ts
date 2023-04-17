import express, { Request, Response } from "express";
import "express-async-errors";
import "dotenv/config";
import { notFound } from "./api/middleware/not-found";
import { errorHandlerMiddleware } from "./api/middleware/error-handler";

const port = process.env.PORT || 3000;
const app = express();

// controller

app.use(express.json());
app.use(express.static("./public"));

// stripe
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
