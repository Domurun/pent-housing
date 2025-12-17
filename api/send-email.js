import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // 1. Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, service, message } = req.body;

  // 2. Configure the email transporter
  // Ideally, use environment variables for security (explained in Step 5)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or specific host if using business email
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  try {
    // 3. Send the email
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address
      to: 'domurunbeeyah@gmail.com', // RECEIVER ADDRESS (Your email)
      replyTo: email,
      subject: `New Inquiry: ${service}`,
      html: `
        <h3>New Website Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}