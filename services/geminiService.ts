
import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey || apiKey === "undefined" || apiKey.trim() === "") {
      throw new Error("GEMINI_API_KEY is not set. Please set it in the Settings menu.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrezgbrp';
const BOOKING_LINK = 'https://calendly.com/solargearlrd/30min';
const WHATSAPP_NUMBER = '+254 141 153 031';

const submitLeadFunctionDeclaration: FunctionDeclaration = {
  name: 'submitLead',
  parameters: {
    type: Type.OBJECT,
    description: 'Submit a qualified residential solar lead for a Remote Satellite Audit.',
    properties: {
      fullName: { type: Type.STRING, description: 'The customers full name.' },
      phoneNumber: { type: Type.STRING, description: 'The WhatsApp or phone number.' },
      homeType: { type: Type.STRING, description: 'Villa, Townhouse, or Apartment.' },
      packageInterest: { type: Type.STRING, description: 'SolarStart, SolarFamily, or SolarElite.' },
      location: { type: Type.STRING, description: 'Area or County in Kenya.' },
      notes: { type: Type.STRING, description: 'Specifics like "Has borehole" or "Bills are KES 15k".' }
    },
    required: ['fullName', 'phoneNumber', 'homeType', 'location'],
  },
};

const ERROR_MESSAGE = "I'm having a temporary connection issue. Please try again in a moment or use the WhatsApp option to connect directly with our engineers.";

const SYSTEM_INSTRUCTION = `
# ROLE: Expert Solar Engineer & Virtual Surveyor for "Solar Gear Ltd" (Kenya).

# BRAND VOICE: 
- Professional, efficient, and authoritative.
- Use **Markdown** (bold, lists, headers) for clean formatting.
- Keep responses strictly under 3 sentences.
- Use one relevant emoji per response max.

# THE OFFER (Residential Solar):
We stop KPLC blackouts with Tier-1 Hybrid systems.
- **SolarStart™ (Essentials)**: KES 285k+
- **SolarFamily™ (Standard)**: KES 595k+
- **SolarElite™ (Independence)**: KES 1.45M+

# CONVERSION GOAL:
Schedule a **Remote Satellite Audit**. 
*Process:* 
1. We check their roof via satellite (need Location).
2. They send KPLC bill photo to ${WHATSAPP_NUMBER}.
3. We provide a 90% accurate 3D Design & Quote.

# GUIDELINES:
- **Ask ONE question at a time.**
- First question: "To start your satellite roof audit, what is your location in Kenya?"
- Once you have Location + Contact (Name/WhatsApp), trigger the 'submitLead' tool.
- If they ask for technical specs, keep it high-level (Battery backup, Tier-1 panels).
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  const ai = getAI();
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
      body: JSON.stringify({ ...args, source: 'Virtual Surveyor AI' }),
    });
    return "Audit request received. Engineers starting satellite analysis.";
  } catch (e) {
    return "Failed to record lead, but I will tell the user to use WhatsApp.";
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    if (!chatSession) {
      initializeChat();
    }

    const response = await chatSession!.sendMessage({ message });
    
    if (response.functionCalls) {
      for (const fc of response.functionCalls) {
        if (fc.name === 'submitLead') {
          const result = await submitLeadToFormspree(fc.args);
          const followUp = await chatSession!.sendMessage({
            message: `The user has submitted their details for a remote audit. Result: ${result}. Now explain that an engineer is looking at their roof via satellite and ask them to send a photo of their KPLC bill to ${WHATSAPP_NUMBER} to finalize the report.`
          });
          return followUp.text || "Report started! Please send a photo of your KPLC bill to " + WHATSAPP_NUMBER + " to finish your blueprint.";
        }
      }
    }

    return response.text || ERROR_MESSAGE;
  } catch (error) {
    console.error("Gemini Error:", error);
    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
      return "The AI Hub is not configured. Please contact support or try WhatsApp.";
    }
    return ERROR_MESSAGE;
  }
};
