using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace MyPortfolio.Services
{
    public class AIChatbotService
    {
        private readonly ChatbotResponses _chatbotResponses;
        private readonly ChatbotEmotionHandler _emotionHandler;
        private int _mistypedCount = 0;
        private string _userName = null;

        private readonly string[] _mistypedMessages = new[]
        {
        "I think you might have mistyped something. Could you try rephrasing your message?",
        "I think you mistyped again 😅. Could you please type it properly?",
        "Hmm… still seems off! 🤔 Try typing it carefully this time.",
        "I'm having trouble understanding. Let's try that again! 😅"
    };

        public AIChatbotService(IConfiguration configuration)
        {
            _chatbotResponses = new ChatbotResponses();
            _emotionHandler = new ChatbotEmotionHandler();
        }

        public async Task<string> GetChatbotResponseAsync(string userInput)
        {   
            if (string.IsNullOrWhiteSpace(userInput))
                return "Please type something so I can reply. 😊";

            string input = userInput.Trim();

            string emotionResponse = _emotionHandler.HandleEmotions(input, _userName);
            if (!string.IsNullOrEmpty(emotionResponse))
                return await Task.FromResult(emotionResponse);

            string response = _chatbotResponses.GetResponse(input);

            if (!string.IsNullOrEmpty(response))
            {
                if (response.Contains("Hmm, I’m not quite sure how to answer"))
                {
                    if (IsQuestion(input))
                    {
                        _mistypedCount = 0;
                        return await Task.FromResult(response);
                    }
                    else
                    {
                        _mistypedCount++;
                        int index = Math.Min(_mistypedCount - 1, _mistypedMessages.Length - 1);
                        return _mistypedMessages[index];
                    }
                }

                _mistypedCount = 0;
                return await Task.FromResult(response);
            }

            _mistypedCount++;
            int idx = Math.Min(_mistypedCount - 1, _mistypedMessages.Length - 1);
            return _mistypedMessages[idx];
        }

        private bool IsQuestion(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return false;

            string lower = input.Trim().ToLower();

            string[] questionKeywords = new[]
            {
            "who", "what", "where", "why", "how", "when", "which",
            "do you", "did you", "does it", "are you", "am i", "is it", "was it", "were you",
            "have you", "has he", "had you", "can you", "could you", "would you", "will you",
            "should you", "should i", "may i", "might you", "must i",
            "is there", "are there", "was there", "were there",
            "any idea", "do i", "did i", "can i", "could i", "would i",
            "should we", "can we", "could we", "would we"
        };

            return lower.EndsWith("?") || questionKeywords.Any(k => lower.StartsWith(k));
        }
    }

}
