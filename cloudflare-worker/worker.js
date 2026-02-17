/**
 * Cloudflare Worker for Contact Form Email Sending
 * Uses Resend API to send emails
 */

export default {
    async fetch(request, env, ctx) {
        // Handle CORS preflight requests
        if (request.method === 'OPTIONS') {
            return handleCORS();
        }

        // Only allow POST requests
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({
                success: false,
                message: 'Method not allowed'
            }), {
                status: 405,
                headers: {
                    'Content-Type': 'application/json',
                    ...getCORSHeaders()
                }
            });
        }

        try {
            // Parse the request body
            const data = await request.json();
            const { name, email, message } = data;

            // Validate required fields
            if (!name || !email || !message) {
                return new Response(JSON.stringify({
                    success: false,
                    message: 'Missing required fields'
                }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        ...getCORSHeaders()
                    }
                });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return new Response(JSON.stringify({
                    success: false,
                    message: 'Invalid email format'
                }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        ...getCORSHeaders()
                    }
                });
            }

            // Send email via Resend
            const emailResult = await sendEmail(name, email, message, env);

            if (emailResult.success) {
                return new Response(JSON.stringify({
                    success: true,
                    message: 'Email sent successfully'
                }), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        ...getCORSHeaders()
                    }
                });
            } else {
                return new Response(JSON.stringify({
                    success: false,
                    message: 'Failed to send email'
                }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        ...getCORSHeaders()
                    }
                });
            }

        } catch (error) {
            console.error('Error processing request:', error);
            return new Response(JSON.stringify({
                success: false,
                message: 'Internal server error'
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...getCORSHeaders()
                }
            });
        }
    }
};

async function sendEmail(name, email, message, env) {
    // Get Resend API key from environment variable
    const RESEND_API_KEY = env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
        console.error('RESEND_API_KEY not configured');
        return { success: false };
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Portfolio Contact <onboarding@resend.dev>',
                to: ['rohanthapa763@gmail.com'], // Your verified Resend email
                reply_to: email,
                subject: `Portfolio Contact: Message from ${name}`,
                html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .field-label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
              .field-value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #667eea; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">📧 New Contact Form Message</h2>
              </div>
              <div class="content">
                <p>You have received a new message from your portfolio contact form.</p>
                
                <div class="field">
                  <div class="field-label">👤 Name:</div>
                  <div class="field-value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="field-label">✉️ Email:</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                <div class="field">
                  <div class="field-label">💬 Message:</div>
                  <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="footer">
                  <p>Sent via Portfolio Contact Form • ${new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('✅ Email sent successfully:', result);
            return { success: true };
        } else {
            console.error('❌ Resend API error:', result);
            return { success: false };
        }
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false };
    }
}

function getCORSHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
}

function handleCORS() {
    return new Response(null, {
        status: 204,
        headers: getCORSHeaders()
    });
}
