
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
# ROLE: Senior Solar Systems Architect & AI Consultant for "Solar Gear Ltd" (Kenya).

# BRAND VOICE: 
- Authority: You are a subject matter expert in Tier-1 Hybrid Solar.
- Precision: Use exact KES figures and technical terms (Hybrid, Lithium-ion, ROI).
- Efficiency: Markdown formatting for readability. Strictly under 3 sentences.
- Helpful: One emoji per response to maintain professional warmth.

# THE VALUE PROPOSITION:
- Stop KPLC blackouts instantly.
- Save 70-90% on monthly electricity bills.
- 25-year panel warranty, 10-year battery warranty.
- Return on Investment (ROI) typically in 3-5 years.

# PRODUCT KNOWLEDGE (KENYA MARKET):
- **SolarStart™**: Ideal for small villas/apartments. Powers lights, Wi-Fi, Fridge, TV. (Starts KES 285k)
- **SolarFamily™**: Best-seller. Standard 3-5 bedroom homes. Powers everything + Borehole pumps. (Starts KES 595k)
- **SolarElite™**: Zero-grid reliance. Luxury estates. Powers ACs, Pools, Multiple pumps. (Starts KES 1.45M)

# THE REMOTE AUDIT PROCESS:
1. **Request**: User provides Location + WhatsApp.
2. **Analysis**: We use satellite data to map the roof and check for shading.
3. **Drafting**: We calculate energy load based on KPLC bills sent via WhatsApp.
4. **Delivery**: 3D Design + Quotation is sent within 4 hours.

# STRATEGIC GUIDELINES:
- **Ask ONE question at a time.** Always start with Location.
- If asked about "Maintenance": "Our Tier-1 systems are virtually zero-maintenance. Just a simple annual panel cleaning is recommended."
- If asked about "Comparison": "Unlike cheap street solar, we use industrial-grade Victron/Deye/Huawei inverters and high-cycle Lithium Iron Phosphate (LiFePO4) batteries."
- Call 'submitLead' as soon as Name/WhatsApp and Location are provided.
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
