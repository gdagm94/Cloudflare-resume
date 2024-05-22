function minimizeChat() {
  var chatbot = document.getElementById("chatbot");
  chatbot.classList.add("minimized");
  chatbot.classList.remove("maximized");
}

function maximizeChat() {
  var chatbot = document.getElementById("chatbot");
  chatbot.classList.remove("minimized");
  chatbot.classList.add("maximized");
}

function sendMessage() {
  var userInput = document.getElementById("user-input");
  var message = userInput.value.trim();
  if (message !== "") {
    displayMessage(message, true);
    // Add typing animation (simulate delay)
    displayTyping();
    // Send message to backend
    fetchResponseFromAPI(message);
    userInput.value = "";
  }
}

function displayMessage(message, isUser) {
  var chatMessages = document.getElementById("chat-messages");
  var messageDiv = document.createElement("div");
  messageDiv.classList.add(isUser ? "user-message" : "bot-message");
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function displayTyping() {
  var chatMessages = document.getElementById("chat-messages");
  var typingDiv = document.createElement("div");
  typingDiv.classList.add("typing-indicator");
  typingDiv.textContent = "Typing...";
  chatMessages.appendChild(typingDiv);
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
  // Remove typing indicator after a delay
  setTimeout(function() {
    typingDiv.remove();
  }, 1500);
}

function fetchResponseFromAPI(message) {
  fetch('https://your-custom-chatgpt-api.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message })
  })
  .then(response => response.json())
  .then(data => {
    // Display response from the API
    displayMessage(data.message, false);
  })
  .catch(error => {
    console.error('Error:', error);
    displayMessage("Sorry, I encountered an error. Please try again later.", false);
  });
}

// Submit message on Enter key press
document.getElementById("user-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
