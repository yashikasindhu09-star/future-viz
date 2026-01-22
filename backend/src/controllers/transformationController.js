const Replicate = require("replicate");
const path = require("path");
const fs = require("fs");

// In-memory storage
const transformationStore = {};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

// -------- AI TRANSFORMATION (FACE SWAP) --------
const transformImageWithAI = async (imagePath, career) => {
  console.log(`🎨 Calling Replicate Face Swap for ${career}...`);

  const absoluteImagePath = path.join(__dirname, "../../", imagePath);
  const imageBuffer = fs.readFileSync(absoluteImagePath);

  const prompt = `A ${career} in professional uniform, realistic photo`;

  const output = await replicate.run(
    "fofr/face-swap",
    {
      input: {
        source_image: imageBuffer,
        target_prompt: prompt
      }
    }
  );

  return output;
};

// -------- UPLOAD & TRANSFORM --------
const uploadAndTransformImage = async (req, res) => {
  try {
    const { career } = req.body;
    const file = req.file;

    if (!file || !career) {
      return res.status(400).json({ message: "Image and career are required" });
    }

    const transformationId = `trans_${Date.now()}`;

    transformationStore[transformationId] = {
      _id: transformationId,
      userId: req.user.userId,
      career,
      status: "processing",
      originalImageUrl: `/uploads/${file.filename}`,
      transformedImageUrl: null,
      createdAt: new Date(),
    };

    res.json({
      transformationId,
      status: "processing",
    });

    const resultUrl = await transformImageWithAI(
      transformationStore[transformationId].originalImageUrl,
      career
    );

    transformationStore[transformationId].transformedImageUrl = resultUrl;
    transformationStore[transformationId].status = "completed";

    console.log("✅ Face swap transformation completed");
  } catch (error) {
    console.error("❌ Replicate error:", error.message);
  }
};

// -------- GET TRANSFORMATION --------
const getTransformation = async (req, res) => {
  const transformation = transformationStore[req.params.transformationId];
  if (!transformation) {
    return res.status(404).json({ message: "Transformation not found" });
  }
  res.json(transformation);
};

// -------- GET USER TRANSFORMATIONS --------
const getUserTransformations = async (req, res) => {
  const data = Object.values(transformationStore).filter(
    (t) => t.userId === req.user.userId
  );
  res.json(data);
};

module.exports = {
  uploadAndTransformImage,
  getTransformation,
  getUserTransformations,
};
