using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace MyPortfolio.Services
{
    public class ChatbotNormalizer
    {
        public string NormalizeInput(string input)
        {
            if (string.IsNullOrWhiteSpace(input)) return string.Empty;

            string s = input.Trim();

            var contractions = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                { "what's", "what is" }, { "whats", "what is" }, { "who's", "who is" }, { "whos", "who is" },
                { "where's", "where is" }, { "wheres", "where is" }, { "it's", "it is" }, { "its", "it is" },
                { "i'm", "i am" }, { "im", "i am" }, { "i've", "i have" }, { "you've", "you have" },
                { "you're", "you are" }, { "youre", "you are" }, { "we're", "we are" }, { "they're", "they are" },
                { "that's", "that is" }, { "thats", "that is" }, { "there's", "there is" }, { "theres", "there is" },
                { "what're", "what are" }, { "whatre", "what are" }, { "don't", "do not" }, { "dont", "do not" },
                { "can't", "cannot" }, { "cant", "cannot" }, { "won't", "will not" }, { "wont", "will not" },
                { "isn't", "is not" }, { "isnt", "is not" }, { "aren't", "are not" }, { "arent", "are not" },
                { "couldn't", "could not" }, { "couldnt", "could not" }, { "wouldn't", "would not" }, { "wouldnt", "would not" },
                { "shouldn't", "should not" }, { "shouldnt", "should not" }, { "let's", "let us" }, { "lets", "let us" },
                { "i'll", "i will" }, { "ill", "i will" }, { "i'd", "i would" }, { "id", "i would" }
            };

            foreach (var kv in contractions)
                s = Regex.Replace(s, $@"\b{Regex.Escape(kv.Key)}\b", kv.Value, RegexOptions.IgnoreCase);

            s = Regex.Replace(s, @"\bur\b", "your", RegexOptions.IgnoreCase);
            s = Regex.Replace(s, @"\bu\b", "you", RegexOptions.IgnoreCase);
            s = Regex.Replace(s, @"\br\b", "are", RegexOptions.IgnoreCase);
            s = Regex.Replace(s, @"\bwhr\b", "where", RegexOptions.IgnoreCase);
            s = Regex.Replace(s, @"\bwut\b", "what", RegexOptions.IgnoreCase);
            s = Regex.Replace(s, @"\bwat\b", "what", RegexOptions.IgnoreCase);
            s = Regex.Replace(s, @"\bpls\b", "please", RegexOptions.IgnoreCase);

            s = Regex.Replace(s, @"[^\w\s]", " ");
            s = Regex.Replace(s, @"\s+", " ").Trim();

            return s.ToLowerInvariant();
        }

        public string NormalizeKey(string key) => NormalizeInput(key);
    }
}
