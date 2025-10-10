using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace MyPortfolio.Services
{
    public class ChatbotResponses
    {
        private class Intent
        {
            public string Name { get; set; }
            public List<string> Keywords { get; set; } = new List<string>();
            public List<string> NormalizedKeywords { get; set; } = new List<string>();
            public string Response { get; set; }
        }

        private readonly List<Intent> _intents;

        public ChatbotResponses()
        {
            _intents = new List<Intent>();

            _intents.Add(new Intent
            {
                Name = "age",
                Keywords = new List<string>
                {
                    "how old are you", "what is your age", "what's your age", "whats your age", "how old are u", "age"
                },
                Response = "I'm in my early 20s — still young, full of energy, and eager to learn more! ⚡"
            });

            _intents.Add(new Intent
            {
                Name = "name_who_are_you",
                Keywords = new List<string>
                {
                    "what is your name", "what's your name", "whats your name", "your name",
                    "who are you", "who're you", "who are u"
                },
                Response = "Hi! I'm Marc Andrei Santos, your portfolio assistant! How can I help you today? 😊"
            });


            _intents.Add(new Intent
            {
                Name = "what_do_you_do",
                Keywords = new List<string>
                {
                    "what do you do", "what do you do for a living", "what is your work", "what is your job",
                    "what is your first job", "first job", "what do you work on"
                },
                Response = "I’m a software developer who builds web applications using .NET technologies. You can check the 'What I Do' section in my portfolio to learn more. 😊"
            });

            _intents.Add(new Intent
            {
                Name = "work_place",
                Keywords = new List<string>
                {
                    "where do you work", "where do you work at", "where are you working", "who do you work for", "company"
                },
                Response = "I currently work at H2 Software Consulting Services in Pasig City, Metro Manila. 💼"
            });

            _intents.Add(new Intent
            {
                Name = "skills",
                Keywords = new List<string>
                {
                    "what are your skills", "what skills do you have", "what languages do you use",
                    "what technologies do you use", "what programming languages", "skills"
                },
                Response = "I specialize in .NET technologies (C#) and web development. You can find more details in the About Me section under 'What I Bring to the Table.' 💻"
            });

            _intents.Add(new Intent
            {
                Name = "location",
                Keywords = new List<string>
                {
                    "where are you from", "where do you live", "where do you come from", "origin"
                },
                Response = "I'm from Calapan City, Oriental Mindoro, Philippines — a calm and peaceful place I proudly call home! 🏡"
            });

            _intents.Add(new Intent
            {
                Name = "student",
                Keywords = new List<string>
                {
                    "are you a student", "student", "still studying", "do you study"
                },
                Response = "Not anymore — I'm a graduate and currently focused on building web applications. 🎓"
            });

            _intents.Add(new Intent
            {
                Name = "hobbies",
                Keywords = new List<string>
                {
                    "what are your hobbies", "what do you do for fun", "what do you like to do", "hobbies", "hobby", "sports", "what are your sports", "what is your sport"
                },
                Response = "I enjoy coding personal projects, gaming, and playing chess, basketball, and badminton in my free time! 🏸🏀♟️"
            });

            _intents.Add(new Intent
            {
                Name = "how_are_you",
                Keywords = new List<string>
                {
                    "how are you", "how's it going", "how are you doing", "how have you been", "what's up", "whats up"
                },
                Response = "I'm doing great, thanks for asking! How about you? 😊"
            });

            _intents.Add(new Intent
            {
                Name = "greeting",
                Keywords = new List<string>
                {
                    "hi", "hello", "hey", "hi there", "hello there", "good day", "wassup", "good morning", "good afternoon", "good evening", "who is marc andrei santos",
                    "who is marc andrei", "who is marc"
                },
                Response = "Hi there! I'm Marc Andrei Santos, a software developer. How can I help you today? 😊"
            });

            _intents.Add(new Intent
            {
                Name = "thanks",
                Keywords = new List<string>
                {
                    "thank you", "thanks", "thank you so much", "appreciate it"
                },
                Response = "You're very welcome! 🥰"
            });

            _intents.Add(new Intent
            {
                Name = "compliments",
                Keywords = new List<string>
                {
                    "you're awesome", "you're cool", "you're nice", "good job", "great job", "well done", "congratulations", "nice"
                },
                Response = "Aww, thank you! That really means a lot to me. 😊"
            });

            _intents.Add(new Intent
            {
                Name = "farewell",
                Keywords = new List<string>
                {
                    "bye", "goodbye", "see you", "farewell", "see ya", "take care", "see you later", "see you soon"
                },
                Response = "Goodbye! It was great chatting with you. Take care and see you soon! 👋"
            });

            _intents.Add(new Intent
            {
                Name = "good_night",
                Keywords = new List<string>
                {
                    "good night", "sweet dreams", "night"
                },
                Response = "Good night! Sleep well and recharge for tomorrow. 🌙"
            });

            _intents.Add(new Intent
            {
                Name = "good_day",
                Keywords = new List<string>
                {
                    "have a nice day", "have a great day", "have a good one"
                },
                Response = "Thank you! I hope your day goes amazing too! ☀️"
            });

            foreach (var intent in _intents)
            {
                intent.NormalizedKeywords = intent.Keywords
                    .Where(k => !string.IsNullOrWhiteSpace(k))
                    .Select(k => Normalize(k))
                    .Distinct()
                    .ToList();
            }
        }

        public string GetResponse(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return "I didn’t quite catch that. Could you try typing it again? 😊";

            string normInput = Normalize(input);

            foreach (var intent in _intents)
            {
                if (intent.NormalizedKeywords.Any(kw => Regex.IsMatch(normInput, $@"\b{Regex.Escape(kw)}\b")))
                    return intent.Response;

            }
            return "Hmm, I’m not quite sure how to answer that. You can ask me about Marc’s portfolio, his background, or even his expertise! 😊";
        }

        private string Normalize(string s)
        {
            if (string.IsNullOrWhiteSpace(s)) return string.Empty;

            s = s.Trim();

            var map = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                { "what's", "what is" }, { "whats", "what is" }, { "whatre", "what are" }, { "what're", "what are" },
                { "who's", "who is" }, { "whos", "who is" }, { "where's", "where is" }, { "wheres", "where is" },
                { "i'm", "i am" }, { "im", "i am" }, { "you're", "you are" }, { "youre", "you are" },
                { "it's", "it is" }, { "its", "it is" }, { "don't", "do not" }, { "dont", "do not" },
                { "can't", "cannot" }, { "cant", "cannot" }, { "won't", "will not" }, { "wont", "will not" },
                { "what's up", "what is up" }, { "whats up", "what is up" }
            };

            foreach (var kv in map)
            {
                s = Regex.Replace(s, $@"\b{Regex.Escape(kv.Key)}\b", kv.Value, RegexOptions.IgnoreCase);
            }

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
    }
}
