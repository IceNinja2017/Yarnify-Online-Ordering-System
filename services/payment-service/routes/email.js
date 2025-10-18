import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Sends an email notification when an order's status is updated.
 * @param {string} userEmail - The email address of the customer.
 * @param {object} order - The order object containing details like ID, status, items, total.
 */
export const sendOrderStatusEmail = async (userEmail, order) => {
    if (!userEmail) {
        console.error(`Cannot send status email for order ${order._id}: User email is missing.`);
        return; // Don't proceed if email is not available
    }

    // Define the email content
    const mailOptions = {
        from: '"Yarnify Orders" <orders@yarnify.com>', // Sender address
        to: userEmail, // Recipient email
        subject: `Yarnify Order Update: #${order._id} is now ${order.status}`, // Email subject
        // Email body (HTML format)
        html: `
            <h1>Your Order Status Has Been Updated</h1>
            <p>Hello,</p>
            <p>The status of your Yarnify order #${order._id} has been updated to: <strong>${order.status}</strong>.</p>
            <hr>
            <p><strong>Order Summary:</strong></p>
            <ul>
                ${order.items.map(item => `<li>${item.name} (Qty: ${item.quantity}) - ₱${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
            </ul>
            <p><strong>Total Amount: ₱${order.totalAmount.toFixed(2)}</strong></p>
            <p>Payment Method: ${order.paymentMethod}</p>
            ${order.transactionId ? `<p>Transaction ID: ${order.transactionId}</p>` : ''}
            <hr>
            <p>Thank you for shopping with Yarnify!</p>
        `,
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(`Order status (${order.status}) email sent successfully to ${userEmail} for order ${order._id}: ${info.messageId}`);
    } catch (error) {
        console.error(`Error sending order status email to ${userEmail} for order ${order._id}:`, error);
        // Consider adding more robust error handling if needed
    }
};