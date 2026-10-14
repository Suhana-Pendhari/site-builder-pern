import { generateWebsite } from '../services/aiService.js';

export async function generate(req, res) {
  try {
    const { prompt, existingCode } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (prompt.length > 2000) {
      return res.status(400).json({ error: 'Prompt is too long (max 2000 characters)' });
    }

    const generatedCode = await generateWebsite(prompt, existingCode);

    res.json({
      success: true,
      html: generatedCode.html,
      css: generatedCode.css,
      javascript: generatedCode.javascript
    });
  } catch (error) {
    console.error('Generate error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate website' 
    });
  }
}
