# 🚀 Future Viz - Career Visualization App

An interactive app that helps students visualize their future careers through AI-powered photo transformation. Students can take a photo and see themselves as their desired profession!

## Features

✨ **Mobile OTP Authentication** - Secure login using phone number and OTP
🤖 **AI Chatbot** - Conversational guide to select desired career
📸 **Photo Capture & Upload** - Take photos from camera or upload from gallery
🎨 **AI Image Transformation** - Transform photos to show student in their future career
🖼️ **Photo Gallery** - View all transformations
👤 **User Profile** - Manage personal information and career goals

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (File upload)
- Twilio (SMS/OTP)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Twilio Account (for OTP)

### Setup Instructions

#### 1. Clone and Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/future-viz
JWT_SECRET=your_jwt_secret_key_here
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
OPENAI_API_KEY=your_openai_api_key
REPLICATE_API_TOKEN=your_replicate_api_token
```

Start backend:
```bash
npm run dev
```

#### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`
Backend API will be on `http://localhost:5000`

## Project Structure

```
future/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── twilio.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── chatbotController.js
│   │   │   └── transformationController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Transformation.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── chatbot.js
│   │   │   └── transformation.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Chatbot.jsx
    │   │   ├── PhotoTransform.jsx
    │   │   └── Gallery.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone
- `POST /api/auth/verify-otp` - Verify OTP and login
- `GET /api/auth/profile` - Get user profile (authenticated)
- `PUT /api/auth/profile` - Update user profile (authenticated)

### Chatbot
- `GET /api/chatbot/greeting` - Get chatbot greeting
- `POST /api/chatbot/chat` - Process user input

### Transformations
- `POST /api/transformations/transform` - Upload photo and transform
- `GET /api/transformations/:id` - Get transformation status
- `GET /api/transformations` - Get all user transformations

## Configuration

### Twilio Setup
1. Create a Twilio account
2. Get your Account SID and Auth Token
3. Set up a Twilio phone number
4. Add credentials to `.env`

### AI Image Transformation
The app uses Replicate API for image transformation. Replace the mock implementation in `transformationController.js` with actual API calls:

```javascript
// Example with Replicate
const response = await axios.post(
  'https://api.replicate.com/v1/predictions',
  {
    version: 'MODEL_VERSION_ID',
    input: {
      prompt: prompt,
      image: imageUrl,
    },
  },
  {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
    },
  }
);
```

## Usage

1. **Login** - Enter mobile number, receive OTP, verify to login
2. **Chat** - Talk to the AI chatbot to select your desired career
3. **Transform** - Take or upload a photo to see yourself in that career
4. **Gallery** - View all your transformations

## Future Enhancements

- [ ] Integration with real AI image transformation APIs
- [ ] Social sharing features
- [ ] Career information and resources
- [ ] Achievements and badges
- [ ] Parent/teacher dashboard
- [ ] Multiple language support
- [ ] Advanced career matching algorithm
- [ ] Video transformation support

## License

MIT License

## Support

For questions or issues, please open an issue on GitHub.
