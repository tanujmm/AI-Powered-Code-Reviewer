// const aiService = require("../services/ai.service.js");

// module.exports.getResponse = async (req, res) => {
//   const prompt = req.query.prompt;
//   if (!prompt) {
//     return res.status(400).json("Prompt is required");
//   }
//   const response = await aiService(prompt);
// };
const aiService = require("../services/ai.service.js");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).json("Prompt is required");
  }
  try {
    const response = await aiService(code);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
