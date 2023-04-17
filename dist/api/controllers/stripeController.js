"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeController = void 0;
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const stripeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { purchase, total_amount, shipping_fee } = req.body;
    const calculateOrderAmount = () => {
        return total_amount + shipping_fee;
    };
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
    });
    console.log(paymentIntent);
    res.json({ clientSecret: paymentIntent.client_secret });
});
exports.stripeController = stripeController;
