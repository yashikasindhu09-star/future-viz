const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// SEND OTP USING TWILIO VERIFY
const sendOTP = async (phoneNumber) => {
  try {

    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phoneNumber,
        channel: "sms"
      });

    return true;

  } catch (error) {
    console.error(`Error sending OTP: ${error.message}`);
    throw error;
  }
};

// VERIFY OTP
const verifyOTP = async (phoneNumber, code) => {
  try {

    const result = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phoneNumber,
        code: code
      });

    return result.status === "approved";

  } catch (error) {
    console.error(`Error verifying OTP: ${error.message}`);
    return false;
  }
};

module.exports = { sendOTP, verifyOTP };
