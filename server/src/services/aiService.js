import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are an expert web developer and UI/UX designer. Your task is to generate complete, modern, responsive websites based on user prompts.

You must respond with a valid JSON object containing exactly these fields:
{
  "html": "Complete HTML structure with semantic tags, proper DOCTYPE, and content sections",
  "css": "Complete CSS styling with modern design, responsive layout, and proper class names",
  "javascript": "JavaScript code for interactivity (can be empty string if not needed)"
}

Requirements:
- HTML should be complete with <!DOCTYPE html>, <html>, <head>, <body> tags
- Use semantic HTML5 elements (header, nav, main, section, footer, etc.)
- Include meaningful content based on the user's prompt
- CSS should use modern features (flexbox, grid, CSS variables)
- Ensure responsive design for mobile, tablet, and desktop
- Use a modern color palette with good contrast
- Include hover effects and smooth transitions
- JavaScript should be practical and relevant to the website type
- Do not include external CDN links unless absolutely necessary
- All CSS should be inline or use the class names referenced in HTML
- Ensure the design looks professional and polished
- Return ONLY the JSON object, no additional text or explanations
- Do not include markdown code blocks or backticks

When given follow-up prompts to modify an existing website, preserve the existing structure and content while implementing the requested changes.`;

export async function generateWebsite(prompt, existingCode = null) {
  try {
    // Verify API key is set at runtime, not at module load
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    // Initialize AI client at runtime with the API key
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

    let userPrompt = prompt;

    if (existingCode) {
      userPrompt = `Modify the following website based on this request: "${prompt}"

Current website code:
HTML: ${existingCode.html}
CSS: ${existingCode.css}
JavaScript: ${existingCode.javascript}

Apply the requested changes while preserving the overall structure and unrelated content.`;
    }

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Request: ${userPrompt}`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-flash-latest',
      contents: fullPrompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 4000,
      }
    });

    const content = response.text;

    if (!content) {
      throw new Error('No content generated from AI');
    }

    // Clean up potential markdown code blocks
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.slice(7);
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.slice(3);
    }
    if (cleanedContent.endsWith('```')) {
      cleanedContent = cleanedContent.slice(0, -3);
    }
    cleanedContent = cleanedContent.trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', cleanedContent);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate response structure
    if (!parsed.html || !parsed.css || parsed.javascript === undefined) {
      throw new Error('Invalid response structure from AI');
    }

    return {
      html: parsed.html,
      css: parsed.css,
      javascript: parsed.javascript || ''
    };
  } catch (error) {
    console.error('AI generation error:', error);

    if (error.message?.includes('API key') || error.message?.includes('credentials')) {
      throw new Error('Invalid or missing GEMINI_API_KEY. Please add your Gemini API key to the .env file.');
    } else if (error.message?.includes('quota') || error.message?.includes('429')) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else if (error.message?.includes('service') || error.message?.includes('500')) {
      throw new Error('Gemini service error. Please try again.');
    }

    throw new Error(`Failed to generate website: ${error.message}`);
  }
}
