import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOrderStatusEmail = async (userEmail, order) => {
  if (!userEmail) return;
  const mailOptions = {
    from: '"Yarnify Orders" <orders@yarnify.com>',
    to: userEmail,
    subject: `Yarnify Order #${order._id} Status: ${order.status}`,
    html: `<h1>Order Update</h1>
           <p>The status of your Yarnify order #${order._id} is now: 
           <strong>${order.status}</strong>.</p>
           <p>Total: ₱${order.totalAmount.toFixed(2)}</p>`
  };
  await transporter.sendMail(mailOptions);
};
