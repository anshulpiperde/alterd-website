import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? '✓ Loaded' : '✗ Missing');
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '✓ Loaded' : '✗ Missing');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Create Order Endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    // Check if API keys are present
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('❌ Razorpay API keys not found in environment variables');
      return res.status(500).json({ 
        error: 'Razorpay API keys not configured',
        message: 'Please check your .env file'
      });
    }

    // Debug: Log key format (first/last few characters only for security)
    const keyId = process.env.RAZORPAY_KEY_ID.trim();
    const keySecret = process.env.RAZORPAY_KEY_SECRET.trim();
    console.log('Using Key ID:', keyId.substring(0, 8) + '...' + keyId.substring(keyId.length - 4));
    console.log('Key Secret length:', keySecret.length, 'characters');

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Create order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({
      error: 'Failed to create order',
      message: error.message,
    });
  }
});

// Verify Payment Endpoint
app.post('/api/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required payment details' });
    }

    // Create signature for verification
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body.toString())
      .digest('hex');

    // Verify signature
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({
      error: 'Failed to verify payment',
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Local API Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - POST http://localhost:${PORT}/api/create-order`);
  console.log(`   - POST http://localhost:${PORT}/api/verify-payment\n`);
});
