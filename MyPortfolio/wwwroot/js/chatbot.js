$(document).ready(function () {
  const $chatToggle = $("#chat-toggle");
  const $chatWindow = $("#chat-window");
  const $chatBox = $("#chatBox");
  const $chatForm = $("#chatForm");
  const $userMessage = $("#userMessage");
  const $sendButton = $("#sendButton");
  const $sendText = $(".send-text");
  const $circleLoader = $(".circle-loader");

  const botPfp = "/images/coding.jpg";
  let isBotTyping = false;

  // Open / Close Chat
  $chatToggle.on("click", function () {
    if ($chatWindow.hasClass("show")) {
      $chatWindow.removeClass("show");
      setTimeout(() => $chatWindow.addClass("hidden"), 300);
    } else {
      $chatWindow.removeClass("hidden");
      setTimeout(() => $chatWindow.addClass("show"), 10);
    }
  });

  $("#close-chat").on("click", function () {
    $chatWindow.removeClass("show");
    setTimeout(() => $chatWindow.addClass("hidden"), 300);
  });

  appendMessage("bot", "Hi! 👋 Welcome to my Portfolio!", botPfp);

  $chatForm.on("submit", function (e) {
    e.preventDefault();
    if (isBotTyping) return;

    const userMsg = $userMessage.val();
    if (!userMsg.trim()) return;

    appendMessage("user", userMsg);
    $userMessage.val("");

    isBotTyping = true;
    $userMessage.prop("disabled", true);
    $sendButton.prop("disabled", true).addClass("disabled");
    $circleLoader.show();

    setTimeout(() => {
      showTypingText();

      setTimeout(() => {
        $.ajax({
          url: "/Chatbot/Ask",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify({ message: userMsg }),
          success: function (data) {
            hideTypingText();
            appendMessage("bot", data.answer, botPfp);
          },
          error: function () {
            hideTypingText();
            appendMessage("bot", "Sorry, there was a problem connecting to the chatbot service.", botPfp);
          },
          complete: function () {
            isBotTyping = false;
            $userMessage.prop("disabled", false);
            $sendButton.prop("disabled", false).removeClass("disabled");
            $circleLoader.hide();
            $userMessage.focus();
          }
        });
      }, 5000); 
    }, 3000);
  });

  // Append message
  function appendMessage(sender, text, pfp = null) {
    let imageHTML =
      sender === "bot" && pfp
        ? `<img src="${pfp}" class="pfp-small" />`
        : "";
    const messageHTML =
      sender === "user"
        ? `<div class="chat-message user"><div class="message-text">${text}</div></div>`
        : `<div class="chat-message bot">${imageHTML}<div class="message-text">${text}</div></div>`;
    $chatBox.append(messageHTML);
    $chatBox.scrollTop($chatBox[0].scrollHeight);
  }

  function showTypingText() {
    if ($(".typing-text").length === 0) {
      const typingHTML = `
        <div class="chat-message bot typing-text">
          <img src="${botPfp}" class="pfp-small" />
          <div class="message-text typing-indicator">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>`;
      $chatBox.append(typingHTML);
      $chatBox.scrollTop($chatBox[0].scrollHeight);
    }
  }

  function hideTypingText() {
    $(".typing-text").remove();
  }
});
