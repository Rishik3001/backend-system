async function sendEmail(to, subject, text) {
    console.log(`[EMAIL to ${to}] Subject: ${subject} | Message: ${text}`);
  }
  
  module.exports = sendEmail;
  