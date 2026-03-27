const router = require('express').Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Fallback mock responses if no API key is provided
const mockFallback = (query) => {
  const q = query.toLowerCase();
  if (q.includes('fine') || q.includes('cancel')) {
    return "If you cancel a booking after the provider has started moving towards your location or has arrived, a ₹100 fine will be applied to your account.";
  } else if (q.includes('pay') || q.includes('cash')) {
    return "You can pay for services via Cash or by scanning our UPI QR Code provided by the service provider upon completion of work.";
  } else if (q.includes('provider') || q.includes('time') || q.includes('late')) {
    return "Our providers usually arrive within 30–60 minutes of accepting a booking. You can track their location live if they are moving!";
  } else if (q.includes('hello') || q.includes('hi')) {
    return "Hello! I am the HomeEase AI assistant. How can I help you today?";
  } else {
    return "I'm a simple AI assistant for HomeEase. I can answer questions about cancellation fines, payment methods, and provider tracking. (Configure GEMINI_API_KEY in server/.env for the full AI experience!)";
  }
};

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback response
      const fallbackMsg = mockFallback(message);
      // add a small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      return res.json({ response: fallbackMsg });
    }

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // System prompt tailored for HomeEase
    const prompt = `You are a helpful customer support AI for "HomeEase", an app that connects customers with local service providers like mechanics, electricians, plumbers, etc.
    Key rules of HomeEase:
    1. Customers can book providers near them.
    2. A ₹100 fine is strictly applied if the customer cancels the booking AFTER the provider has "started moving" or "arrived".
    3. Payments can be done via Cash or UPI/QR code directly to the provider.
    4. Providers can be tracked live on a Google Map once they start moving.
    
    The user says: "${message}"
    Respond in a friendly, concise, and helpful manner focusing only on answering the user's question based on these rules.`;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    res.json({ response: aiResponse });

  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Failed to generate AI response. Please try again later." });
  }
});

module.exports = router;
