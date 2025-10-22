import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOrderStatusEmail = async (userEmail, order) => {
    if (!userEmail) {
        console.error(`Cannot send email for order ${order._id}: User email missing.`);
        return;
    }
    const mailOptions = {
        from: '"Yarnify Orders" <orders@yarnify.com>',
        to: userEmail,
        subject: `Yarnify Order #${order._id} Status: ${order.status}`,
        html: `<h1>Order Update</h1><p>Hi there,</p><p>The status of your Yarnify order #${order._id} is now: <strong>${order.status}</strong>.</p><p>Total: ₱${order.totalAmount.toFixed(2)}</p><p>Thank you!</p>`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Order status email sent to ${userEmail} for order ${order._id}`);
    } catch (error) {
        console.error(`Error sending email for order ${order._id}:`, error);
    }
};