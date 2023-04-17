import { Request, Response } from "express";

const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const stripeController = async (req: Request, res: Response) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });
  console.log(paymentIntent);

  res.json({ clientSecret: paymentIntent.client_secret });
};
