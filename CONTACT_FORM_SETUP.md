# 📧 Contact Form Setup Instructions

## Quick Start (3 Minutes)

### Step 1: Get Your Web3Forms Access Key

1. **Go to** [https://web3forms.com](https://web3forms.com)
2. **Click** "Get Started for Free"
3. **Sign up** with your email: `rohanthapashrestha@gmail.com`
4. **Verify** your email (check inbox)
5. **Copy** your Access Key from the dashboard

### Step 2: Add Access Key to Your Project

1. **Open** the file: `f:\Portfolio\portfolio\.env.local`
2. **Replace** `your_access_key_here` with your actual access key
3. **Save** the file

Example:
```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=abc123-def456-ghi789
```

### Step 3: Restart Dev Server

```bash
# Stop the current server (Ctrl+C if running)
npm run dev
```

### Step 4: Test the Contact Form

1. Go to `http://localhost:3000`
2. Scroll to the **Contact** section
3. Fill in the form:
   - **Name**: Your Name
   - **Email**: your.email@example.com
   - **Message**: Test message
4. Click **"Send Message"**
5. You should see **"Message Sent! ✓"**
6. Check your email (`rohanthapashrestha@gmail.com`) for the message!

---

## Security Features ✅

Web3Forms includes:
- ✅ **HTTPS Encryption** - All data sent securely
- ✅ **Spam Protection** - Built-in honeypot and captcha support
- ✅ **No Data Storage** - Emails forwarded directly, not stored
- ✅ **Rate Limiting** - Prevents abuse
- ✅ **Trusted Service** - Used by 50,000+ developers

---

## Troubleshooting

### "Web3Forms access key not configured"
- Make sure you added the key to `.env.local`
- Restart the dev server after adding the key

### Email not received
- Check spam folder
- Verify the access key is correct
- Make sure you verified your Web3Forms email

### Form shows error
- Check browser console (F12) for specific error messages
- Ensure internet connection is working

---

## What Changed

- ✅ Removed EmailJS (required 3 keys, complex setup)
- ✅ Added Web3Forms (requires 1 key, simple setup)
- ✅ No external dependencies needed (uses native fetch)
- ✅ Better error handling
- ✅ Same UI and user experience

---

## Free Tier Limits

- **250 emails per month** (free)
- For higher volume, upgrade plans available
- Perfect for portfolio contact forms

---

Need help? The error messages in the form will guide you, or check the browser console for details.
