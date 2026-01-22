// ================= AUTH CONTROLLER – TWILIO VERIFY VERSION =================

const twilio = require("twilio");
const jwt = require("jsonwebtoken");

// -------- SEND OTP --------
const sendOTPToPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        message: "Phone number is required"
      });
    }

    // Initialize Twilio client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send OTP using TWILIO VERIFY
    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phoneNumber,
        channel: "sms"
      });

    console.log(`📱 OTP sent to ${phoneNumber}`);

    return res.json({
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("Error sending OTP:", error.message);

    return res.status(500).json({
      message: error.message
    });
  }
};


// -------- VERIFY OTP & LOGIN --------
const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({
        message: "Phone number and OTP are required"
      });
    }

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Verify with Twilio
    const result = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phoneNumber,
        code: otp
      });

    if (result.status !== "approved") {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    // Create JWT after successful verification
    const token = jwt.sign(
      {
        userId: `user_${phoneNumber}_${Date.now()}`,
        phoneNumber
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: `user_${phoneNumber}_${Date.now()}`,
        phoneNumber,
        name: "",
        careerGoal: ""
      }
    });

  } catch (error) {
    console.error("Error verifying OTP:", error.message);

    return res.status(500).json({
      message: error.message
    });
  }
};


// -------- GET PROFILE --------
const getUserProfile = async (req, res) => {
  try {
    return res.json({
      id: req.user.userId,
      phoneNumber: req.user.phoneNumber,
      name: "",
      age: null,
      careerGoal: ""
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


// -------- UPDATE PROFILE --------
const updateUserProfile = async (req, res) => {
  try {
    const { name, age, careerGoal } = req.body;

    return res.json({
      id: req.user.userId,
      phoneNumber: req.user.phoneNumber,
      name,
      age,
      careerGoal,
      updatedAt: new Date()
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  sendOTPToPhone,
  verifyOTP,
  getUserProfile,
  updateUserProfile
};
