import express from "express";
import "express-async-errors";
import "dotenv/config";
import morgan from "morgan";
import { notFound } from "./api/middleware/not-found";
import { errorHandlerMiddleware } from "./api/middleware/error-handler";
import { stripeController } from "./api/controllers/stripeController";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(morgan("dev"));

// stripe
app.post("/stripe", stripeController);

//error handler
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
