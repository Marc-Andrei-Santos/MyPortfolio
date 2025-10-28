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

            // 👋 Greeting
            _intents.Add(new Intent
            {
                Name = "greeting",
                Keywords = new List<string>
                {
                    "hi", "hello", "hey", "hi there", "hello there", "good day",
                    "good morning", "good afternoon", "good evening",
                    "who is marc", "who is marc andrei", "who is marc andrei santos"
                },
                Response = "Hi there! I'm Marc Andrei Santos — your portfolio assistant! How can I help you explore my work? 😊"
            });

            // 💼 About
            _intents.Add(new Intent
            {
                Name = "who_are_you",
                Keywords = new List<string>
                {
                    "who are you", "what is your name", "your name", "who are u"
                },
                Response = "I'm Marc Andrei Santos, the creator of this portfolio — here to help you learn about my projects and experience. 💼"
            });

            // 👨‍💻 What do you do
            _intents.Add(new Intent
            {
                Name = "what_do_you_do",
                Keywords = new List<string>
                {
                    "what do you do", "what is your work", "what is your job",
                    "what is your role", "what do you work on"
                },
                Response = "I'm a software developer specializing in .NET technologies and web development. You can learn more in the 'About Me' or 'What I Do' section. 💻"
            });

            // 🧠 Skills
            _intents.Add(new Intent
            {
                Name = "skills",
                Keywords = new List<string>
                {
                    "what are your skills", "what skills do you have", "what technologies do you use",
                    "what programming languages", "tech stack", "skills"
                },
                Response = "I work with C#, ASP.NET Core, JavaScript, and modern web frameworks. Check out the Skills section to see the full list! ⚙️"
            });

            // 🧩 Projects
            _intents.Add(new Intent
            {
                Name = "projects",
                Keywords = new List<string>
                {
                    "what are your projects", "show me your projects", "portfolio projects",
                    "what have you built", "sample projects", "personal projects"
                },
                Response = "You can view my featured projects in the 'Projects' section — each one includes a short description and technologies used. 🚀"
            });

            // 🏢 Work experience
            _intents.Add(new Intent
            {
                Name = "experience",
                Keywords = new List<string>
                {
                    "experience", "work experience", "career", "employment", "background"
                },
                Response = "I have professional experience in web development using .NET technologies. Visit the Experience section to see more details. 💼"
            });

            // 🎓 Education or background 
            _intents.Add(new Intent
            {
                Name = "education",
                Keywords = new List<string>
                {
                    "education", "school", "college", "university", "degree"
                },
                Response = "🔧 [Your education info goes here — e.g., 'I graduated with a degree in Information Technology.']"
            });

            // 🧭 Services offered 
            _intents.Add(new Intent
            {
                Name = "services",
                Keywords = new List<string>
                {
                    "what do you offer", "services", "what can you do", "what can you build"
                },
                Response = "🔧 [Describe your portfolio services — e.g., 'I create web applications, APIs, and front-end interfaces.']"
            });

            // 💬 Contact
            _intents.Add(new Intent
            {
                Name = "contact",
                Keywords = new List<string>
                {
                    "contact", "how can i reach you", "email", "message you", "connect with you"
                },
                Response = "You can reach me through the Contact section — it includes my email and social media links. 📬"
            });

            // 🙏 Thanks
            _intents.Add(new Intent
            {
                Name = "thanks",
                Keywords = new List<string>
                {
                    "thank you", "thanks", "thank you so much", "appreciate it"
                },
                Response = "You're very welcome! 🥰"
            });

            // 💬 Compliments
            _intents.Add(new Intent
            {
                Name = "compliments",
                Keywords = new List<string>
                {
                    "you're awesome", "you're cool", "you're nice",
                    "good job", "great job", "well done", "congratulations", "nice"
                },
                Response = "Aww, thank you! That really means a lot to me. 😊"
            });

            // 🌙 Good night
            _intents.Add(new Intent
            {
                Name = "good_night",
                Keywords = new List<string>
                {
                    "good night", "sweet dreams", "night"
                },
                Response = "Good night! Sleep well and recharge for tomorrow. 🌙"
            });

            // ☀️ Good day
            _intents.Add(new Intent
            {
                Name = "good_day",
                Keywords = new List<string>
                {
                    "have a nice day", "have a great day", "have a good one"
                },
                Response = "Thank you! I hope your day goes amazing too! ☀️"
            });

            // 👋 Farewell
            _intents.Add(new Intent
            {
                Name = "farewell",
                Keywords = new List<string>
                {
                    "bye", "goodbye", "see you", "farewell", "see ya", "take care", "see you later", "see you soon"
                },
                Response = "Goodbye! It was great chatting with you. Take care and see you soon! 👋"
            });

            // 🧩 Fallback / Default
            _intents.Add(new Intent
            {
                Name = "fallback",
                Keywords = new List<string>(),
                Response = "Hmm, I’m not quite sure how to answer that. You can ask me about my projects, skills, or experience! 😊"
            });

            // Normalize keywords for matching
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

            return "Hmm, I’m not quite sure how to answer that. You can ask me about my portfolio, projects, or skills! 😊";
        }

        private string Normalize(string s)
        {
            if (string.IsNullOrWhiteSpace(s)) return string.Empty;

            s = s.Trim();

            var map = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                { "what's", "what is" }, { "whats", "what is" }, { "who's", "who is" },
                { "where's", "where is" }, { "you're", "you are" }, { "youre", "you are" },
                { "it's", "it is" }, { "its", "it is" }, { "don't", "do not" },
                { "cant", "cannot" }, { "can't", "cannot" }, { "wont", "will not" },
                { "won't", "will not" }
            };

            foreach (var kv in map)
            {
                s = Regex.Replace(s, $@"\b{Regex.Escape(kv.Key)}\b", kv.Value, RegexOptions.IgnoreCase);
            }

            s = Regex.Replace(s, @"[^\w\s]", " ");
            s = Regex.Replace(s, @"\s+", " ").Trim();

            return s.ToLowerInvariant();
        }
    }
}
