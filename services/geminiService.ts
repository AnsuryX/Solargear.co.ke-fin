
import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrezgbrp';
const BOOKING_LINK = 'https://calendly.com/solargearlrd/30min';
const WHATSAPP_NUMBER = '+254 722 371 250';

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

const ERROR_MESSAGE = "I'm having a temporary connection issue. Please try again in a moment or use the WhatsApp option to connect directly with our engineers.";

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
${ERROR_MESSAGE}
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ functionDeclarations: [submitLeadFunctionDeclaration] }],
      temperature: 0.7,
    },
  });
};

const submitLeadToFormspree = async (args: any) => {
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...args, source: 'AI Chat' }),
    });
    return "Lead successfully recorded. Engineers notified.";
  } catch (e) {
    console.error("Formspree error", e);
    return "Failed to record lead, but I will tell the user to use WhatsApp.";
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) initializeChat();

  try {
    const response = await chatSession!.sendMessage({ message });
    
    if (response.functionCalls) {
      for (const fc of response.functionCalls) {
        if (fc.name === 'submitLead') {
          const result = await submitLeadToFormspree(fc.args);
          const followUp = await chatSession!.sendMessage({
            message: `The user has submitted their details. Result: ${result}. Now confirm to the user that an engineer will reach out and provide the booking link ${BOOKING_LINK}.`
          });
          return followUp.text || "Details received! Please book your assessment here: " + BOOKING_LINK;
        }
      }
    }

    return response.text || ERROR_MESSAGE;
  } catch (error) {
    console.error("Gemini Error:", error);
    return ERROR_MESSAGE;
  }
};
