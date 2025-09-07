import { GoogleGenerativeAI } from '@google/generative-ai';

// Note: In production, store this securely (environment variables, secure storage, etc.)
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with actual API key

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async recognizeFood(imageUri: string): Promise<{ name: string; confidence: number }> {
    try {
      // Convert image to base64
      const base64Image = await this.convertImageToBase64(imageUri);
      
      const prompt = `
        Analyze this food image and identify what food items you can see. 
        Please respond in JSON format with the following structure:
        {
          "name": "primary food name in English (e.g., 'Chicken sandwich', 'Apple slices', 'Rice with vegetables')",
          "confidence": 0.85
        }
        
        Guidelines:
        - Focus on the main food item
        - Use simple, clear food names
        - Confidence should be between 0.1 and 1.0
        - If unsure, use a generic description like "Mixed food" or "Meal"
        - For multiple items, focus on the largest/main item
      `;

      const imagePart = {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg"
        }
      };

      const result = await this.model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON response
      try {
        const parsed = JSON.parse(text);
        return {
          name: parsed.name || 'Unknown food',
          confidence: Math.min(Math.max(parsed.confidence || 0.5, 0.1), 1.0)
        };
      } catch (parseError) {
        // If JSON parsing fails, extract food name from text
        console.log('JSON parse failed, using text extraction:', text);
        return {
          name: this.extractFoodNameFromText(text),
          confidence: 0.7
        };
      }
    } catch (error) {
      console.error('Gemini food recognition error:', error);
      // Return fallback result
      return {
        name: 'Food item',
        confidence: 0.1
      };
    }
  }

  private async convertImageToBase64(imageUri: string): Promise<string> {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  }

  private extractFoodNameFromText(text: string): string {
    // Simple text extraction as fallback
    const lines = text.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('{') && !trimmed.startsWith('```')) {
        return trimmed.replace(/[^a-zA-Z\s]/g, '').trim() || 'Food item';
      }
    }
    return 'Food item';
  }

  // For testing without API key
  async mockRecognizeFood(imageUri: string): Promise<{ name: string; confidence: number }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockFoods = [
      'Pizza slice',
      'Hamburger',
      'Fruit salad',
      'Chicken sandwich',
      'Rice bowl',
      'Pasta dish',
      'Salad',
      'Breakfast cereal',
      'Toast with jam',
      'Apple slices'
    ];
    
    return {
      name: mockFoods[Math.floor(Math.random() * mockFoods.length)],
      confidence: 0.75 + Math.random() * 0.2
    };
  }
}

export const geminiService = new GeminiService();