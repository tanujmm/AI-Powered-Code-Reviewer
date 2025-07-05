// const aiService = require("../services/ai.service.js");

// module.exports.getReview = async (req, res) => {
//   const { code } = req.body;
//   if (!code) {
//     return res.status(400).json("Prompt is required");
//   }
//   try {
//     const response = await aiService(code);
//     res.status(200).json({ response });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const aiService = require("../services/ai.service.js");

module.exports.getReview = async (req, res) => {
  const { code } = req.body;

  // Input validation
  if (!code || typeof code !== "string" || code.trim() === "") {
    return res
      .status(400)
      .json({ error: "Code is required and must be a string." });
  }

  try {
    const response = await aiService(code);

    // Optional: if AI returns nothing
    if (!response) {
      return res
        .status(500)
        .json({ error: "AI service did not return a response." });
    }

    res.status(200).json({ response });
  } catch (error) {
    console.error("AI Controller Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
