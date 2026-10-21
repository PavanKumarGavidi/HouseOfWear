// Email and SMS notification service
// This is a mock implementation - in production, integrate with Resend (email) and MSG91 (SMS)

export interface EmailNotification {
  to: string;
  subject: string;
  html: string;
}

export interface SMSNotification {
  to: string;
  message: string;
}

export interface NotificationResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Email templates
export const emailTemplates = {
  orderConfirmation: (orderNumber: string, total: number) => ({
    subject: `Order Confirmation - ${orderNumber}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order <strong>${orderNumber}</strong> has been confirmed.</p>
      <p>Total: ₹${total.toLocaleString()}</p>
      <p>We'll send you another email when your order ships.</p>
    `,
  }),

  orderShipped: (orderNumber: string, trackingUrl: string) => ({
    subject: `Your Order ${orderNumber} has Shipped!`,
    html: `
      <h1>Your order is on the way!</h1>
      <p>Order <strong>${orderNumber}</strong> has been shipped.</p>
      <p><a href="${trackingUrl}">Track your order</a></p>
    `,
  }),

  orderDelivered: (orderNumber: string) => ({
    subject: `Order ${orderNumber} Delivered`,
    html: `
      <h1>Your order has been delivered!</h1>
      <p>Order <strong>${orderNumber}</strong> has been delivered.</p>
      <p>We hope you love your purchase!</p>
    `,
  }),

  backInStock: (productName: string, productUrl: string) => ({
    subject: `${productName} is Back in Stock!`,
    html: `
      <h1>Great news!</h1>
      <p><strong>${productName}</strong> is back in stock.</p>
      <p><a href="${productUrl}">Shop now</a></p>
    `,
  }),

  giftCardPurchased: (code: string, amount: number) => ({
    subject: 'Your Gift Card is Ready!',
    html: `
      <h1>Your gift card has been purchased!</h1>
      <p>Gift Card Code: <strong>${code}</strong></p>
      <p>Amount: ₹${amount.toLocaleString()}</p>
      <p>Share this code with your recipient.</p>
    `,
  }),

  welcomeEmail: (name: string) => ({
    subject: 'Welcome to House of Wear!',
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for joining House of Wear.</p>
      <p>Start shopping our latest collections today.</p>
    `,
  }),
};

// SMS templates
export const smsTemplates = {
  otp: (otp: string) => `Your House of Wear OTP is: ${otp}. Valid for 10 minutes.`,

  orderConfirmation: (orderNumber: string) => 
    `Your order ${orderNumber} has been confirmed. Thank you for shopping with House of Wear!`,

  orderShipped: (orderNumber: string, trackingUrl: string) => 
    `Your order ${orderNumber} has shipped! Track: ${trackingUrl}`,

  backInStock: (productName: string, productUrl: string) => 
    `${productName} is back in stock! Shop now: ${productUrl}`,
};

// Mock email service (Resend integration)
export async function sendEmail(notification: EmailNotification): Promise<NotificationResult> {
  console.log('📧 Sending email:', notification);
  
  // Mock API call - in production, use Resend API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate success
  return {
    success: true,
    messageId: `msg_${Date.now()}`,
  };
}

// Mock SMS service (MSG91 integration)
export async function sendSMS(notification: SMSNotification): Promise<NotificationResult> {
  console.log('📱 Sending SMS:', notification);
  
  // Mock API call - in production, use MSG91 API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate success
  return {
    success: true,
    messageId: `sms_${Date.now()}`,
  };
}

// Helper functions
export async function sendOrderConfirmation(email: string, orderNumber: string, total: number) {
  const template = emailTemplates.orderConfirmation(orderNumber, total);
  return sendEmail({ to: email, ...template });
}

export async function sendOrderShipped(email: string, orderNumber: string, trackingUrl: string) {
  const template = emailTemplates.orderShipped(orderNumber, trackingUrl);
  return sendEmail({ to: email, ...template });
}

export async function sendBackInStockEmail(email: string, productName: string, productUrl: string) {
  const template = emailTemplates.backInStock(productName, productUrl);
  return sendEmail({ to: email, ...template });
}

export async function sendBackInStockSMS(phone: string, productName: string, productUrl: string) {
  const message = smsTemplates.backInStock(productName, productUrl);
  return sendSMS({ to: phone, message });
}

export async function sendOTP(phone: string, otp: string) {
  const message = smsTemplates.otp(otp);
  return sendSMS({ to: phone, message });
}
