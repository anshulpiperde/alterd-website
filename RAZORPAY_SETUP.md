# Razorpay Payment Integration Setup

This project includes a complete Razorpay payment integration using Vercel serverless functions.

## Prerequisites

1. A Razorpay account (Sign up at https://razorpay.com/)
2. Razorpay API keys (available in your Razorpay Dashboard)

## Getting Your API Keys

1. Log in to your Razorpay Dashboard: https://dashboard.razorpay.com/
2. Navigate to **Settings** → **API Keys**
3. Generate new keys if you haven't already
4. You'll receive:
   - **Key ID** (starts with `rzp_test_` for test mode or `rzp_live_` for live mode)
   - **Key Secret** (keep this secure and never commit to version control)

## Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   Create a `.env.local` file in the project root:
   ```bash
   cp .env.example .env.local
   ```

3. **Add your Razorpay credentials:**
   Edit `.env.local` and replace the placeholder values:
   ```
   RAZORPAY_KEY_ID=rzp_test_your_key_id_here
   RAZORPAY_KEY_SECRET=your_key_secret_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Vercel Deployment Setup

When deploying to Vercel, you need to add environment variables:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `RAZORPAY_KEY_ID` = Your Razorpay Key ID
   - `RAZORPAY_KEY_SECRET` = Your Razorpay Key Secret
4. Make sure to add them for all environments (Production, Preview, Development)

## Testing the Integration

### Test Mode
- Use Razorpay test keys (starting with `rzp_test_`)
- Use test card details from: https://razorpay.com/docs/payments/payments/test-card-details/

### Common Test Cards:
- **Success:** 4111 1111 1111 1111
- **Failure:** 4111 1111 1111 1112
- CVV: Any 3 digits
- Expiry: Any future date

## How It Works

### 1. Order Creation Flow
```
User clicks "Pay with Razorpay" 
  → Frontend calls /api/create-order
  → Backend creates Razorpay order
  → Returns order details to frontend
```

### 2. Payment Flow
```
Frontend opens Razorpay checkout modal
  → User enters payment details
  → Razorpay processes payment
  → Returns payment details to frontend
```

### 3. Verification Flow
```
Frontend receives payment response
  → Calls /api/verify-payment with signature
  → Backend verifies signature using secret key
  → Returns verification result
  → Frontend shows success/failure message
```

## API Endpoints

### POST /api/create-order
Creates a new Razorpay order.

**Request Body:**
```json
{
  "amount": 1000,
  "currency": "INR",
  "receipt": "order_12345"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_xxx",
    "amount": 100000,
    "currency": "INR"
  },
  "key_id": "rzp_test_xxx"
}
```

### POST /api/verify-payment
Verifies payment signature.

**Request Body:**
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "payment_id": "pay_xxx",
  "order_id": "order_xxx"
}
```

## Security Best Practices

1. **Never expose your Key Secret** - It should only be used on the server side
2. **Always verify payment signatures** - Don't trust client-side data alone
3. **Use HTTPS** - Ensure all payment pages are served over HTTPS
4. **Enable webhook signatures** - Verify webhook authenticity in production
5. **Test thoroughly** - Use test mode before going live

## Currency Support

The current implementation uses INR (Indian Rupees). To support other currencies:

1. Update the currency in `Checkout.tsx`
2. Ensure your Razorpay account supports that currency
3. Update pricing display format accordingly

## Troubleshooting

### "Failed to load Razorpay SDK"
- Check your internet connection
- Ensure the Razorpay CDN is accessible
- Check browser console for errors

### "Payment verification failed"
- Verify your Key Secret is correct
- Check that the signature matches
- Ensure environment variables are properly set

### "Failed to create order"
- Verify your API keys are correct
- Check that your Razorpay account is active
- Review server logs for detailed errors

## Going Live

Before going live:

1. Switch to live API keys (starting with `rzp_live_`)
2. Complete KYC verification in Razorpay Dashboard
3. Test with real small amounts
4. Set up webhooks for payment notifications
5. Implement proper order management system
6. Add email notifications for successful payments

## Support

- Razorpay Documentation: https://razorpay.com/docs/
- Razorpay Support: https://razorpay.com/support/
- Test Cards: https://razorpay.com/docs/payments/payments/test-card-details/
