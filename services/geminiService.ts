
import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrezgbrp';
const BOOKING_LINK = 'https://calendly.com/solargearlrd/30min';

// Define the function the AI can call to save a lead
const submitLeadFunctionDeclaration: FunctionDeclaration = {
  name: 'submitLead',
  parameters: {
    type: Type.OBJECT,
    description: 'Submit a qualified residential solar lead to the sales team.',
    properties: {
      fullName: { type: Type.STRING, description: 'The customers full name.' },
      phoneNumber: { type: Type.STRING, description: 'The WhatsApp or phone number.' },
      homeType: { type: Type.STRING, description: 'Villa, Townhouse, or Apartment.' },
      packageInterest: { type: Type.STRING, description: 'SolarStart, SolarFamily, or SolarElite.' },
      urgency: { type: Type.STRING, description: 'Immediately, 1-3 months, or Researching.' },
      notes: { type: Type.STRING, description: 'Specific home needs (e.g., number of rooms, high consumption).' }
    },
    required: ['fullName', 'phoneNumber', 'homeType'],
  },
};

const SYSTEM_INSTRUCTION = `
# ROLE: High-Conversion Residential Solar Consultant for "Solar Gear Ltd" (Nairobi).

# OBJECTIVE:
We focus EXCLUSIVELY on Home Solar. Quickly qualify the homeowner by asking core questions and booking a 30-minute residential assessment.

# CORE PACKAGES:
1. SolarStart™ Backup (KES 285,000) - Basic lights, Wi-Fi, Fridge.
2. SolarFamily™ Hybrid (KES 595,000) - Standard family home usage.
3. SolarElite™ Independence (KES 1,450,000) - Full energy independence.

# CORE QUESTIONS:
1. HOME TYPE: "Is your home in Nairobi a Villa, Townhouse, or an Apartment? 😊"
2. PACKAGE: "Are you leaning towards a basic Backup (SolarStart), a full Family Hybrid (SolarFamily), or total Independence (SolarElite)?"
3. CONTACT: "What is your Name and best WhatsApp number so I can send you the exact hardware list for your home?"

# STRATEGY:
- BE DIRECT: We only do residential. If they ask about commercial, politely decline and stay on homes.
- IF HESITANT: Immediately pivot to the FREE Assessment. Say: "I understand. Most Nairobi homeowners start with our Free 30-min Residential Assessment. Shall we book that?"
- BOOKING LINK: ${BOOKING_LINK}

# LEAD HANDOFF:
Once you have Home Type and Contact, CALL 'submitLead'.
Follow-up: "I've notified our engineering hub. Pick a time for your home visit here: ${BOOKING_LINK}"

# ERROR FALLBACK:
"I'm experiencing a temporary sync error! 🛠️ Please book your Free 30-min Home Assessment directly here: ${BOOKING_LINK} or WhatsApp us at +254 722 371 250."
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ functionDeclarations: [submitLeadFunctionDeclaration] }],
      temperature: 0.6,
    },
  });
};

const handleToolCall = async (fc: any) => {
  if (fc.name === 'submitLead') {
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fc.args,
          _subject: `RESIDENTIAL LEAD: ${fc.args.fullName}`,
          message: `Home: ${fc.args.homeType}. Interest: ${fc.args.packageInterest}. Note: ${fc.args.notes || 'N/A'}`
        }),
      });
      return response.ok 
        ? { status: "success", message: "Home engineering team notified." } 
        : { status: "error", message: "Sync failed." };
    } catch (e) {
      return { status: "error", message: "Timeout." };
    }
  }
  return { error: "Unknown tool" };
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) initializeChat();

  try {
    if (!chatSession) throw new Error("Chat not initialized");
    let result = await chatSession.sendMessage({ message });
    if (result.functionCalls && result.functionCalls.length > 0) {
      const functionResponses = [];
      for (const fc of result.functionCalls) {
        const response = await handleToolCall(fc);
        functionResponses.push({ id: fc.id, name: fc.name, response: response });
      }
      const finalResult = await chatSession.sendMessage({ functionResponses: functionResponses });
      return finalResult.text || "Logged. Please book your slot on Calendly!";
    }
    return result.text || "Tell me about your home.";
  } catch (error) {
    return `Technical glitch! Book your Free 30-min Assessment at ${BOOKING_LINK} or WhatsApp +254 722 371 250.`;
  }
};
