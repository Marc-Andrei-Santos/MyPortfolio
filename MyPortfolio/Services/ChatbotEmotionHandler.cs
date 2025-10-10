using System;
using System.Text.RegularExpressions;

namespace MyPortfolio.Services
{
    public class ChatbotEmotionHandler
    {
        public string HandleEmotions(string normalized, string userName)
        {
            if (string.IsNullOrWhiteSpace(normalized))
                return null;

            normalized = normalized.ToLowerInvariant().Trim();

            var positiveEmotions = new[]
            {
                "happy","joyful","excited","glad","cheerful","content","satisfied",
                "grateful","thankful","motivated","inspired","hopeful","proud",
                "optimistic","relaxed","calm","peaceful","loved","loving","amused",
                "playful","energetic","enthusiastic","confident","great","fine","good"
            };

            var negativeEmotions = new[]
            {
                "sad","angry","mad","upset","frustrated","annoyed","depressed",
                "anxious","stressed","lonely","afraid","scared","worried","hurt",
                "disappointed","hopeless","miserable","heartbroken","ashamed","guilty",
                "insecure","confused","bored","tired","exhausted","down","unhappy",
                "discouraged","weak","alone","melancholy"
            };

            if (Regex.IsMatch(normalized, @"\b(are|r|do|d)\s*(you|u)\s*(feel|feeling|feelings)?\s*(happy|sad|angry|upset|mad|good|bad|love)\b"))
            {
                return "Thank you for asking! 😊 I don’t have feelings since I’m just Marc's portfolio assistant, and I’m always here to assist you. 😄";
            }

            if (Regex.IsMatch(normalized, @"\b(i\s*am|i'm|im|feeling|i\s*feel|me\s*is)\b"))
            {
                foreach (var e in positiveEmotions)
                {
                    if (normalized.Contains(e))
                        return $"That’s wonderful to hear{(string.IsNullOrEmpty(userName) ? "" : $", {userName}")}! I’m really happy for you. Keep it up! 😄";
                }

                foreach (var e in negativeEmotions)
                {
                    if (normalized.Contains(e))
                        return $"I'm sorry to hear that{(string.IsNullOrEmpty(userName) ? "" : $", {userName}")}. I hope you feel better soon! Remember, better days are coming. 💛";
                }
            }

            foreach (var e in positiveEmotions)
            {
                if (normalized == e || normalized.Contains($" {e} "))
                    return $"That’s wonderful to hear{(string.IsNullOrEmpty(userName) ? "" : $", {userName}")}! I’m really happy for you. Keep it up! 😄";
            }

            foreach (var e in negativeEmotions)
            {
                if (normalized == e || normalized.Contains($" {e} "))
                    return $"I'm sorry to hear that{(string.IsNullOrEmpty(userName) ? "" : $", {userName}")}. I hope you feel better soon! Remember, better days are coming. 💛";
            }

            return null;
        }
    }
}
