'use server';
/**
 * @fileOverview An AI-powered chatbot that provides personalized smart home automation suggestions.
 *
 * - smartSuggestionChatbot - A function that handles the chatbot interaction and returns smart home suggestions.
 * - SmartSuggestionChatbotInput - The input type for the smartSuggestionChatbot function.
 * - SmartSuggestionChatbotOutput - The return type for the smartSuggestionChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSuggestionChatbotInputSchema = z.object({
  userQuery: z.string().describe('The user query or request for smart home suggestions.'),
  usagePatterns: z.string().optional().describe('The user historical smart home usage patterns.'),
  sensorData: z.string().optional().describe('The real-time sensor data from the smart home.'),
});
export type SmartSuggestionChatbotInput = z.infer<typeof SmartSuggestionChatbotInputSchema>;

const SmartSuggestionChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response with personalized smart home suggestions.'),
});
export type SmartSuggestionChatbotOutput = z.infer<typeof SmartSuggestionChatbotOutputSchema>;

export async function smartSuggestionChatbot(input: SmartSuggestionChatbotInput): Promise<SmartSuggestionChatbotOutput> {
  return smartSuggestionChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSuggestionChatbotPrompt',
  input: {schema: SmartSuggestionChatbotInputSchema},
  output: {schema: SmartSuggestionChatbotOutputSchema},
  prompt: `You are a smart home automation expert chatbot. A user will ask you a question, and you will respond with suggestions for how they can automate their smart home.

  Here are their historical usage patterns: {{{usagePatterns}}}
  Here is their real-time sensor data: {{{sensorData}}}

  Here is the user\'s query: {{{userQuery}}}`,
});

const smartSuggestionChatbotFlow = ai.defineFlow(
  {
    name: 'smartSuggestionChatbotFlow',
    inputSchema: SmartSuggestionChatbotInputSchema,
    outputSchema: SmartSuggestionChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
