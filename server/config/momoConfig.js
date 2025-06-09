require('dotenv').config();

module.exports = {
  PARTNER_CODE: process.env.MOMO_PARTNER_CODE || 'MOMO',
  ACCESS_KEY: process.env.MOMO_ACCESS_KEY || 'F8BBA842ECF85',
  SECRET_KEY: process.env.MOMO_SECRET_KEY || 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
  ENDPOINT: 'https://test-payment.momo.vn/v2/gateway/api/create',
  REDIRECT_URL: 'http://localhost:5173', // Sửa lại URL để có thể nhận parameters
  IPN_URL: 'http://localhost:3000/api/orders/momo-notify'
};