const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

// Initialize Resend with API key from environment variable or fallback
const resend = new Resend(process.env.RESEND_API_KEY || 're_bH3D3Xr4_NiRjDxDifhFqDshqe3hEXUKo');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Read and convert logo to base64
    let logoBase64 = '';
    try {
      const logoPath = path.join(process.cwd(), 'Images', 'logo.png');
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = logoBuffer.toString('base64');
    } catch (error) {
      console.log('Logo not found, using text fallback');
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Client! <onboarding@resend.dev>',
      to: ['team.atdevstudio@gmail.com'],
      reply_to: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 20px; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h2 style="color: #34d399; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">New Contact Form Submission</h2>
            <div style="height: 2px; background: #34d399; margin-bottom: 20px;"></div>
            
            <div style="background: #1a1a1a; border-radius: 8px; padding: 24px; color: #ffffff;">
              <div style="margin-bottom: 16px;">
                <p style="color: #60a5fa; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">Name:</p>
                <p style="color: #ffffff; font-size: 16px; margin: 0;">${firstName} ${lastName}</p>
              </div>
              
              <div style="margin-bottom: 16px;">
                <p style="color: #60a5fa; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">Email:</p>
                <a href="mailto:${email}" style="color: #34d399; font-size: 16px; text-decoration: underline; margin: 0;">${email}</a>
              </div>
              
              ${phone ? `
              <div style="margin-bottom: 16px;">
                <p style="color: #60a5fa; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">Phone:</p>
                <a href="tel:${phone}" style="color: #34d399; font-size: 16px; text-decoration: underline; margin: 0;">${phone}</a>
              </div>
              ` : ''}
              
              <div style="height: 1px; background: #3a3a3a; margin: 20px 0;"></div>
              
              <div>
                <p style="color: #60a5fa; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Message:</p>
                <p style="color: #ffffff; font-size: 16px; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later or contact us directly.',
      });
    }

    console.log('Email sent successfully:', data.id);

    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your request. Please try again later.',
    });
  }
};
