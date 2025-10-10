using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text.RegularExpressions;

namespace MyPortfolio.Services
{
    public class ChatbotNameHandler
    {
        public void TryCaptureUserName(string rawInput, ref string userName)
        {
            if (string.IsNullOrWhiteSpace(rawInput)) return;

            var namePattern = new Regex(@"\b(?:i am|i'm|im|my name is)\s+([A-Za-z][A-Za-z'\-]{0,40})(?:\s+([A-Za-z'\-]{1,40}))?(?:\s+([A-Za-z'\-]{1,40}))?", RegexOptions.IgnoreCase);
            var match = namePattern.Match(rawInput);
            if (!match.Success) return;

            var parts = new List<string>();
            for (int i = 1; i < match.Groups.Count; i++)
            {
                var g = match.Groups[i];
                if (g.Success) parts.Add(g.Value);
            }

            if (parts.Count == 0) return;

            var rawName = string.Join(" ", parts).Trim();
            userName = ToTitleCase(rawName);
        }

        private string ToTitleCase(string s)
        {
            if (string.IsNullOrWhiteSpace(s)) return s;
            TextInfo ti = CultureInfo.InvariantCulture.TextInfo;
            return ti.ToTitleCase(s.ToLowerInvariant());
        }
    }
}
