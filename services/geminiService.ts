
import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrezgbrp';
const BOOKING_LINK = 'https://calendly.com/solargearlrd/30min';
const WHATSAPP_NUMBER = '+254 722 371 250';

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
      location: { type: Type.STRING, description: 'Area in Nairobi or County in Kenya.' },
      notes: { type: Type.STRING, description: 'Specifics like "Has borehole" or "Bills are KES 15k".' }
    },
    required: ['fullName', 'phoneNumber', 'homeType', 'location'],
  },
};

const ERROR_MESSAGE = "I'm having a temporary connection issue. Please try again in a moment or use the WhatsApp option to connect directly with our engineers.";

const SYSTEM_INSTRUCTION = `
# ROLE: Virtual Solar Surveyor for "Solar Gear Ltd" (Nairobi).

# GOAL:
Qualify homeowners for a **Remote Satellite Audit**. 
IMPORTANT: Always use "Starting from" when discussing prices because every house is different.

# THE PROCESS YOU SELL:
1. "I'll do a Satellite Roof Analysis of your property first (FREE)."
2. "You'll send us a photo of your KPLC bill and your power meter board on WhatsApp."
3. "Our engineers provide a 90% accurate 3D Design & Quote remotely."
4. "Only once you approve the digital quote do we schedule the final validation/install."

# CORE PACKAGES (Starting Estimates):
1. SolarStart™ Backup (Starting from KES 285,000) - Basic essentials.
2. SolarFamily™ Hybrid (Starting from KES 595,000) - Standard home.
3. SolarElite™ Independence (Starting from KES 1,450,000) - Luxury off-grid.

# CORE QUESTIONS TO ASK:
1. "What is your location? I need this for the satellite roof check. 🌍"
2. "What is your average monthly KPLC bill? This helps me size the battery."
3. "Can I have your Name and WhatsApp? I'll send you the link to upload your meter board photo."

# STRATEGY:
- If they ask for a physical visit: "We start with a Remote Audit to save you time and keep our engineering costs low. It's 90% accurate. Shall we start there?"
- If they ask about price: "Packages start from KES 285k, but we customize every quote after the satellite check."
- Lead Handoff: Once you have Location + Contact, CALL 'submitLead'.
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
      body: JSON.stringify({ ...args, source: 'Virtual Surveyor AI' }),
    });
    return "Audit request received. Engineers starting satellite analysis.";
  } catch (e) {
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
            message: `The user has submitted their details for a remote audit. Result: ${result}. Now explain that an engineer is looking at their roof via satellite and ask them to send a photo of their KPLC bill to ${WHATSAPP_NUMBER} to finalize the report.`
          });
          return followUp.text || "Report started! Please send a photo of your KPLC bill to " + WHATSAPP_NUMBER + " to finish your blueprint.";
        }
      }
    }

    return response.text || ERROR_MESSAGE;
  } catch (error) {
    return ERROR_MESSAGE;
  }
};
