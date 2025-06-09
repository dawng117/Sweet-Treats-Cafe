const crypto = require('crypto');
const https = require('https');
const config = require('../config/momoConfig');

class MomoService {
  static createPayment(order) {
    return new Promise((resolve, reject) => {
      try {
        const requestId = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
        const orderId = order._id; // Sử dụng _id của đơn hàng
        const orderInfo = `Sweet Treats Cafe - Order #${order._id}`;
        
        // Create raw signature
        const rawSignature = [
          `accessKey=${config.ACCESS_KEY}`,
          `amount=${order.total}`,
          `extraData=`,
          `ipnUrl=${config.IPN_URL}`,
          `orderId=${orderId}`,
          `orderInfo=${orderInfo}`,
          `partnerCode=${config.PARTNER_CODE}`,
          `redirectUrl=${config.REDIRECT_URL}`,
          `requestId=${requestId}`,
          `requestType=captureWallet`
        ].join('&');

        // Create signature
        const signature = crypto
          .createHmac('sha256', config.SECRET_KEY)
          .update(rawSignature)
          .digest('hex');

        // Create request body
        const requestBody = JSON.stringify({
          partnerCode: config.PARTNER_CODE,
          accessKey: config.ACCESS_KEY,
          requestId: requestId,
          amount: order.total.toString(),
          orderId: orderId,
          orderInfo: orderInfo,
          redirectUrl: config.REDIRECT_URL,
          ipnUrl: config.IPN_URL,
          extraData: '',
          requestType: 'captureWallet',
          signature: signature,
          lang: 'vi'
        });

        // Create HTTPS request options
        const options = {
          hostname: 'test-payment.momo.vn',
          port: 443,
          path: '/v2/gateway/api/create',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
          }
        };

        // Send request to MoMo
        const req = https.request(options, res => {
          let data = '';
          
          res.setEncoding('utf8');
          res.on('data', chunk => { data += chunk; });
          
          res.on('end', () => {
            try {
              const response = JSON.parse(data);
              if (response.resultCode === 0) {
                resolve(response);
              } else {
                reject(new Error(response.message));
              }
            } catch (error) {
              reject(error);
            }
          });
        });

        req.on('error', reject);
        req.write(requestBody);
        req.end();

      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = MomoService;