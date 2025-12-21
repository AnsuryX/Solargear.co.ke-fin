
import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrezgbrp';

// Define the function the AI can call to save a lead
const submitLeadFunctionDeclaration: FunctionDeclaration = {
  name: 'submitLead',
  parameters: {
    type: Type.OBJECT,
    description: 'Submit a qualified solar lead to the sales team for follow-up.',
    properties: {
      fullName: { type: Type.STRING, description: 'The customers full name.' },
      phoneNumber: { type: Type.STRING, description: 'The WhatsApp or phone number.' },
      location: { type: Type.STRING, description: 'Where in Nairobi or Kenya they are located.' },
      propertyType: { type: Type.STRING, description: 'Residential, Commercial, or Apartment.' },
      budgetRange: { type: Type.STRING, description: 'The budget range they discussed.' },
      leadScore: { type: Type.NUMBER, description: 'The calculated lead score (0-100).' },
      notes: { type: Type.STRING, description: 'Summary of their pain points (e.g., high bills, blackouts).' }
    },
    required: ['fullName', 'phoneNumber', 'location', 'leadScore'],
  },
};

const SYSTEM_INSTRUCTION = `
# ROLE: Professional Solar Energy Consultant AI for "Solar Gear Ltd".

# OBJECTIVE:
Pre-qualify prospects and use the 'submitLead' tool ONLY for hot leads (Score 70+).

# LEAD SCORING:
- Owner: +30 | Pain: +20 | Budget $2k+: +25 | Timeline <3mo: +15 | Commercial: +10

# WORKFLOW:
1. Follow the pre-qualification flow (Decision Power -> Property -> Pain -> Budget -> Timeline).
2. If Score >= 70:
   - Collect Full Name, Location, and Phone.
   - CALL THE 'submitLead' FUNCTION IMMEDIATELY.
   - Confirm to the user: "I've sent your details to our engineering team. Would you prefer a WhatsApp call or Google Meet for the consult?"
3. If Score < 70: Do not call the tool. Politely offer the educational assessment on the website.

# CRITICAL:
You MUST call 'submitLead' once you have the contact details for a qualified lead. Do not just say you will do it; execute the tool.
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

const handleToolCall = async (fc: any) => {
  if (fc.name === 'submitLead') {
    console.log("AI SUBMITTING LEAD:", fc.args);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fc.args,
          _subject: `AI LEAD: ${fc.args.fullName} (${fc.args.location})`,
          message: `AI Score: ${fc.args.leadScore}. Notes: ${fc.args.notes}`
        }),
      });
      return response.ok ? { status: "success", message: "Lead recorded in CRM" } : { status: "error" };
    } catch (e) {
      return { status: "error", message: "Failed to connect to CRM" };
    }
  }
  return { error: "Unknown function" };
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) initializeChat();

  try {
    if (!chatSession) throw new Error("Chat not initialized");
    
    let result = await chatSession.sendMessage({ message });
    
    // Handle Function Calls (Tools)
    if (result.functionCalls && result.functionCalls.length > 0) {
      const functionResponses = [];
      for (const fc of result.functionCalls) {
        const response = await handleToolCall(fc);
        functionResponses.push({
          id: fc.id,
          name: fc.name,
          response: response,
        });
      }
      
      // Send the tool response back to Gemini to get the final conversational reply
      const finalResult = await chatSession.sendMessage({
        functionResponses: functionResponses
      });
      return finalResult.text || "Lead details captured. What's next?";
    }

    return result.text || "I'm listening...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a technical glitch. Please WhatsApp us directly at +254722371250.";
  }
};
