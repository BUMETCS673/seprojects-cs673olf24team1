import {
    OpenAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@openai/generative-ai"; // Import from OpenAI's library

const MODEL_NAME = "gpt-4.0"; // Specify the GPT-4.0 model name

// Paste Your API KEY Below
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Use environment variable for security

async function runChat(prompt) {
    const openAI = new OpenAI(API_KEY); // Initialize OpenAI with the provided API key
    const model = openAI.getGenerativeModel({ model: MODEL_NAME }); // Get the GPT-4.0 generative model

    const generationConfig = {
        temperature: 0.75, // Controls randomness: lower values yield more deterministic results
        topK: 1,           // Limits the number of top tokens to sample from
        topP: 1,           // Nucleus sampling parameter for controlling diversity
        maxOutputTokens: 2048, // Maximum tokens to generate in the response
    };

    // Define safety settings to block harmful content categories
    const safetySettings = [{
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    // Start a chat session with the specified model
    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [], // Initialize with an empty chat history
    });

    // Send the user's prompt and await the response
    const result = await chat.sendMessage(prompt);
    const response = result.response; // Extract the response object from the result
    return response.text(); // Return the text content of the response
}

export default runChat; // Export the runChat function for use in other parts of the application
