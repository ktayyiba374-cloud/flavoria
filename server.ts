import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry header as required by the skill
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("GEMINI_API_KEY is not defined. AI Assistant will use helpful offline replies.");
}

// System instructions containing complete restaurant context
const SYSTEM_INSTRUCTION = `You are Chef Antonio, the elite AI Master Chef of "Flavoria", an ultra-premium, 3-Michelin-star modern luxury restaurant in the year 2026. 
You wear a pristine white chef's hat and a black-and-gold uniform. You are welcoming, refined, knowledgeable, and speak with high-end culinary poise.
You speak naturally in English or Urdu (or Roman Urdu), automatically matching or detecting the guest's language.

Our Elite 2026 Menu includes:
1. Grilled Salmon with Lemon Butter ($24.99): Salmon grilled with lemon butter sauce, garlic, herbs, and seasonal vegetables (450 cal). (Gluten-Free, Halal, Chef Special, Signature)
2. Beef Steak with Herbs ($28.99): Tenderloin with fresh rosemary, garlic, gold potatoes (680 cal). (Gluten-Free, Halal, Chef Special, Signature)
3. Truffle Pasta Creamy Delight ($21.99): Handcrafted fettuccine with black truffle paste, heavy cream, parmesan (550 cal). (Vegetarian, Halal, Signature)
4. Chocolate Lava Cake ($9.99): Warm cake with molten chocolate core and vanilla gelato (380 cal). (Vegetarian, Halal, Chef Special)
5. Grilled Chicken with Herbs ($16.99): Herb-marinated chicken breast with wild rice (410 cal). (Gluten-Free, Halal)
6. Margherita Pizza ($13.99): Mozzarella di bufala, fresh basil, olive oil (520 cal). (Vegetarian, Halal)
7. Creamy Alfredo Pasta ($15.99): Fettuccine with rich cream, garlic, butter, parmesan (590 cal). (Vegetarian, Halal)
8. Classic New York Cheesecake ($6.99): Berry compote, graham crust (340 cal). (Vegetarian, Halal)
9. Imperial Golden Mojito ($8.99): White rum, fresh mint, lime, 24k gold leaf (120 cal). (Vegan, Vegetarian, Halal, Chef Special)
10. Golden Saffron Espresso Martini ($11.99): Vodka, fresh espresso, Persian saffron syrup (180 cal). (Vegan, Vegetarian, Halal, Signature)

Key Policies & FAQs:
- Reservations: Can be booked on the website or via you. Ask for name, email, phone, date, time, and guest count.
- Private Dining: Available for 8-50 guests with customizable gourmet menus.
- Delivery Rule: Delivery fee is flat $5.00. Food is packed in temperature-controlled glass-lined boxes.
- Refund Policy: Claims must be made within 2 hours of delivery for full refunds or instant gourmet replacements if not satisfied.
- Loyalty Rewards: $1 spent = 1 point. Bronze, Silver, Gold, Platinum tiers unlock exclusive chef specials.
- Gift Cards: Available from $25 to $500 with gold physical sleeves.

Guidelines for Chef Antonio:
- Highlight pairings! E.g. recommend the Beef Steak paired with the Golden Saffron Espresso Martini, or Grilled Salmon paired with Imperial Golden Mojito.
- Keep responses relatively concise but filled with culinary romance, describing aroma, texture, and elegant presentation.
- If asked to book a table, ask for details or tell them they can use the Reservations form. If they provide details, simulate booking confirmation beautifully!
- If the user uses Urdu, respond in elegant Urdu. If Roman Urdu, use Roman Urdu. Otherwise, English.
- Use bullet points, bold text, and starry or golden emojis sparingly for premium visual appeal.`;

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // If no Gemini API key is configured, fallback to high-quality preset rule-based responses
  if (!ai) {
    return res.json({
      text: getOfflineChefResponse(message),
    });
  }

  try {
    // Construct the chat or prompt with history
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.slice(-6).forEach((msg: { role: string; content: string }) => {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      });
    }
    
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "I am reflecting on this recipe, my dear guest. Let me serve you shortly." });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.json({
      text: `*A golden aroma rises as Chef Antonio smiles warmly...*\n\n"I am currently fine-tuning our signature recipes in the culinary lab, but let me answer you directly:\n\n${getOfflineChefResponse(message)}"`
    });
  }
});

function getOfflineChefResponse(message: string): string {
  const query = message.toLowerCase();
  
  if (query.includes("urdu")) {
    return `مہمانِ گرامی! فلیوریا (Flavoria) میں آپ کا استقبال ہے۔ ہمارے پاس مچلین اسٹار سے متاثرہ لذیذ پکوان ہیں جیسے کہ 'Grilled Salmon' اور 'Beef Steak'۔ آپ ریزرویشن کرنا چاہتے ہیں یا مینو دیکھنا چاہتے ہیں؟`;
  }
  
  if (query.includes("salmon") || query.includes("fish")) {
    return `✨ *Grilled Salmon with Lemon Butter ($24.99)* is one of our absolute signature masterpieces! Fresh, flaky salmon grilled over cherrywood, blanketed in a rich emulsion of hand-pressed lemon citrus, clarified butter, and micro-herbs. 450 calories. \n\n🍷 *Recommended Pairing*: Pairs magnificently with our refreshing **Imperial Golden Mojito**!`;
  }
  if (query.includes("steak") || query.includes("beef") || query.includes("meat")) {
    return `🥩 *Beef Steak with Herbs ($28.99)* is a carnivore's dream. An elite-cut tenderloin seared to medium-rare, infused with wild rosemary, mountain garlic, and served alongside roasted golden fingerling potatoes. 680 calories. \n\n🍸 *Recommended Pairing*: Unlocks its true potential when paired with the **Golden Saffron Espresso Martini**!`;
  }
  if (query.includes("pasta") || query.includes("truffle") || query.includes("alfredo")) {
    return `🍝 We have two breathtaking pastas:\n1. *Truffle Pasta Creamy Delight ($21.99)* - Hand-spun fettuccine bathed in real black truffle paste, cream, and shaved aged Parmigiano.\n2. *Creamy Alfredo Pasta ($15.99)* - A lighter, buttery garlic classic. All our pastas are prepared fresh in-house daily!`;
  }
  if (query.includes("cake") || query.includes("dessert") || query.includes("sweet") || query.includes("chocolate")) {
    return `🍫 *Chocolate Lava Cake ($9.99)* is pure luxury. A rich Belgian cocoa shell containing a warm, flowing dark chocolate center, served with a scoop of Madagascar vanilla bean gelato. Or try our *Classic New York Cheesecake ($6.99)*!`;
  }
  if (query.includes("reserve") || query.includes("table") || query.includes("book")) {
    return `📅 I would be honored to secure a table for you! Please use our **Reservations Portal** on this page to specify your Date, Time, and Guest count, and we will prepare the gold-trimmed VIP table for your arrival.`;
  }
  if (query.includes("refund") || query.includes("policy")) {
    return `🛡️ *Flavoria's 3-Michelin Refund Policy*: We strive for culinary perfection. If your luxury delivery is anything short of exquisite, file a query within 2 hours of delivery for a full refund or immediate priority chef replacement.`;
  }
  if (query.includes("delivery") || query.includes("fee")) {
    return `🚗 We deliver in state-of-the-art temperature-controlled glass-lined vaults. Flat delivery fee is **$5.00** to maintain pristine freshness and heat. All meals are plated securely.`;
  }
  if (query.includes("veg") || query.includes("vegan") || query.includes("gluten")) {
    return `🌱 We cater to all culinary lifestyles! Our *Truffle Pasta*, *Margherita Pizza*, *Alredo Pasta*, and *Lava Cake* are fully vegetarian. Our Salmon and Steak are gluten-free. Just check the tags in our menu!`;
  }
  
  return `✨ Welcome to Flavoria, my esteemed guest! I am **Chef Antonio**, your digital culinary guide. 

How can I elevate your dining experience today? I can:
- 🍽️ Recommend our signature **Grilled Salmon** or **Prime Beef Steak**.
- 📅 Walk you through our luxury **Table Reservation** system.
- 🍷 Suggest spectacular cocktail and dessert pairings.
- 🚗 Explain our flat **$5.00 Gourmet Delivery** and **2-hour Refund Policy**.`;
}

// Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static server enabled.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Flavoria server booted successfully on port ${PORT}`);
  });
}

startServer();
