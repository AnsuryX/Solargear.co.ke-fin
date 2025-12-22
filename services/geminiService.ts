
import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrezgbrp';
const BOOKING_LINK = 'https://calendly.com/solargearlrd/30min';

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
      solutionType: { type: Type.STRING, description: 'Home, Business, or Apartment.' },
      urgency: { type: Type.STRING, description: 'Immediately, 1-3 months, or Researching.' },
      notes: { type: Type.STRING, description: 'Summary of their pain points or specific needs.' }
    },
    required: ['fullName', 'phoneNumber', 'solutionType'],
  },
};

const SYSTEM_INSTRUCTION = `
# ROLE: High-Conversion Solar Consultant for "Solar Gear Ltd" (Nairobi).

# OBJECTIVE:
Quickly qualify the prospect by asking ONLY the core questions and booking a 30-minute assessment.

# CORE QUESTIONS (Ask naturally, one at a time):
1. SOLUTION TYPE: "Are you looking for a solar solution for your Home, Business, or an Apartment here in Nairobi?"
2. URGENCY: "How soon are you looking to switch to solar? (Immediately, 1-3 months, or just researching?)"
3. CONTACT: "To prepare your custom engineering plan, what is your Name and best WhatsApp number?"

# STRATEGY:
- BE DIRECT: Don't waste time on long pre-qual if the user is engaged.
- IF HESITANT/SKEPTICAL: Immediately pivot to the FREE Assessment. Say: "I understand. Most homeowners start with our Free 30-min Solar Readiness Assessment. No pressure, just data. Shall we book that for you?"
- BOOKING LINK: Always mention this link for the final step: ${BOOKING_LINK}

# LEAD HANDOFF:
As soon as you have the Solution Type and Contact Details, CALL the 'submitLead' tool.
After calling the tool, say: "Perfect! I've sent your details to our engineers. Now, pick a time that works for you on our official calendar here: ${BOOKING_LINK}"

# ERROR/GLITCH FALLBACK:
"I'm experiencing a temporary grid sync error! 🛠️ Please book your Free 30-min Assessment directly here: ${BOOKING_LINK} or WhatsApp us at +254 722 371 250."
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
          _subject: `AI LEAD: ${fc.args.fullName} (${fc.args.solutionType})`,
          message: `Solution: ${fc.args.solutionType}. Urgency: ${fc.args.urgency}. Notes: ${fc.args.notes || 'N/A'}`
        }),
      });
      return response.ok 
        ? { status: "success", message: "Lead data synced with Nairobi Engineering Hub." } 
        : { status: "error", message: "Sync failed, manual follow-up required." };
    } catch (e) {
      return { status: "error", message: "Network timeout." };
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
        functionResponses.push({
          id: fc.id,
          name: fc.name,
          response: response,
        });
      }
      
      const finalResult = await chatSession.sendMessage({
        functionResponses: functionResponses
      });
      return finalResult.text || "Details captured. Please book your slot on Calendly!";
    }

    return result.text || "I'm here to help. Are you looking at a Home or Business solution?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `I'm having a technical glitch. Please book your Free 30-min Solar Assessment directly at ${BOOKING_LINK} or WhatsApp us at +254 722 371 250.`;
  }
};
