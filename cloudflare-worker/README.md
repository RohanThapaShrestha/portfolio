# Cloudflare Worker - Portfolio Contact Form

This directory contains the Cloudflare Worker that handles contact form submissions from your portfolio website.

## Files

- **worker.js** - Main Worker code that processes form submissions and sends emails via MailChannels
- **wrangler.toml** - Configuration file for Wrangler CLI deployment

## Quick Deploy

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy the worker
wrangler deploy
```

## How It Works

1. Receives POST requests from the contact form
2. Validates form data (name, email, message)
3. Sends formatted email via MailChannels API
4. Email is sent to `info@rohanthapashrestha.com.np`
5. Cloudflare Email Routing forwards it to your inbox

## Features

- ✅ Input validation
- ✅ CORS protection
- ✅ Beautiful HTML email templates
- ✅ Error handling
- ✅ Free tier: 100,000 requests/day

## Configuration

After deployment, copy the Worker URL and add it to your `.env.local`:

```bash
NEXT_PUBLIC_WORKER_URL=https://portfolio-contact-email.your-subdomain.workers.dev
```

## Full Setup Guide

See [CLOUDFLARE_WORKER_SETUP.md](../CLOUDFLARE_WORKER_SETUP.md) in the parent directory for complete setup instructions including DNS configuration.
