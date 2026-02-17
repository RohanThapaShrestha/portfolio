/**
 * Cloudflare Worker for Contact Form Email Sending
 * Uses MailChannels API to send emails
 */

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
        return handleCORS()
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
        })
    }

    try {
        // Parse the request body
        const data = await request.json()
        const { name, email, message } = data

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
            })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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
            })
        }

        // Send email via MailChannels
        const emailResult = await sendEmail(name, email, message)

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
            })
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
            })
        }

    } catch (error) {
        console.error('Error processing request:', error)
        return new Response(JSON.stringify({
            success: false,
            message: 'Internal server error'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                ...getCORSHeaders()
            }
        })
    }
}

async function sendEmail(name, email, message) {
    const send_request = new Request('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            personalizations: [
                {
                    to: [
                        {
                            email: 'info@rohanthapashrestha.com.np',
                            name: 'Rohan Thapa Shrestha'
                        }
                    ],
                    dkim_domain: 'rohanthapashrestha.com.np', // Your domain
                    dkim_selector: 'mailchannels', // DNS DKIM selector
                }
            ],
            from: {
                email: 'noreply@rohanthapashrestha.com.np',
                name: 'Portfolio Contact Form'
            },
            reply_to: {
                email: email,
                name: name
            },
            subject: `Portfolio Contact: Message from ${name}`,
            content: [
                {
                    type: 'text/plain',
                    value: `You have received a new message from your portfolio contact form.\n\n` +
                        `Name: ${name}\n` +
                        `Email: ${email}\n` +
                        `Message:\n${message}\n\n` +
                        `---\n` +
                        `Sent via Portfolio Contact Form`
                },
                {
                    type: 'text/html',
                    value: `
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
          `
                }
            ]
        }),
    })

    try {
        const response = await fetch(send_request)
        const result = await response.json()

        if (response.ok) {
            return { success: true }
        } else {
            console.error('MailChannels error:', result)
            return { success: false }
        }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false }
    }
}

function getCORSHeaders() {
    return {
        'Access-Control-Allow-Origin': '*', // Change to your domain in production: 'https://yourdomain.com'
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
}

function handleCORS() {
    return new Response(null, {
        status: 204,
        headers: getCORSHeaders()
    })
}
