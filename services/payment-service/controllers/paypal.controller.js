import paypalClient from "../config/paypal.js";
import paypal from "@paypal/checkout-server-sdk";

//createPayPalOrder
export const createPayPalOrder = async (req, res) => {
  const { totalAmount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: totalAmount.toFixed(2),
        },
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating PayPal order" });
  }
};

//capturePayPalOrder
export const capturePayPalOrder = async (req, res) => {
  const { orderID } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);
    res.json({ status: "COMPLETED", details: capture.result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error capturing PayPal order" });
  }
};
