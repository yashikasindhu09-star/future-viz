// =======================================
// Future Viz - Auth Controller (DEMO MODE)
// Hardcoded OTP (no Twilio required)
// =======================================

const jwt = require('jsonwebtoken');


// =======================================
// In-memory OTP store
// =======================================

const otpStore = {};


// =======================================
// Send OTP (DEMO)
// =======================================

const sendOTPToPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        message: 'Phone number is required'
      });
    }

    // 🔥 HARD CODED OTP (sir asked)
    const otp = "123456";

    // Store OTP temporarily
    otpStore[phoneNumber] = {
      otp,
      expiry: Date.now() + 10 * 60 * 1000 // 10 minutes
    };

    console.log(`📱 Demo OTP for ${phoneNumber}: ${otp}`);

    res.json({
      message: 'OTP sent successfully (demo mode)',
      otp // visible for testing
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================================
// Verify OTP
// =======================================

const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({
        message: 'Phone number and OTP are required'
      });
    }

    const stored = otpStore[phoneNumber];

    if (
      !stored ||
      stored.otp !== otp ||
      stored.expiry < Date.now()
    ) {
      return res.status(400).json({
        message: 'Invalid or expired OTP'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: `user_${phoneNumber}_${Date.now()}`,
        phoneNumber
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: '30d' }
    );

    delete otpStore[phoneNumber];

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: `user_${phoneNumber}`,
        phoneNumber,
        name: '',
        careerGoal: ''
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================================
// Get Profile
// =======================================

const getUserProfile = async (req, res) => {
  try {
    res.json({
      id: req.user.userId,
      phoneNumber: req.user.phoneNumber,
      name: '',
      age: null,
      careerGoal: ''
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================================
// Update Profile
// =======================================

const updateUserProfile = async (req, res) => {
  try {
    const { name, age, careerGoal } = req.body;

    res.json({
      id: req.user.userId,
      phoneNumber: req.user.phoneNumber,
      name,
      age,
      careerGoal,
      updatedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================================
// Exports
// =======================================

module.exports = {
  sendOTPToPhone,
  verifyOTP,
  getUserProfile,
  updateUserProfile
};
