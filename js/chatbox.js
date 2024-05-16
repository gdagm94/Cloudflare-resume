// Chat Box Functionality
document.addEventListener('DOMContentLoaded', function () {
  const chatBox = document.getElementById('chat-box');
  const closeChat = document.getElementById('close-chat');
  const sendMessageButton = document.getElementById('send-message');
  const chatInput = document.getElementById('chat-input');
  const chatBoxMessages = document.getElementById('chat-box-messages');

  closeChat.addEventListener('click', () => {
    chatBox.style.display = 'none';
  });

  sendMessageButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      addMessageToChatBox('You', message);
      chatInput.value = '';
      // Here you would add the code to send the message to your OpenAI API and handle the response
    }
  });

  chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      sendMessageButton.click();
    }
  });

  function addMessageToChatBox(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBoxMessages.appendChild(messageElement);
    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight;
  }
});

sendMessageButton.addEventListener('click', async () => {
  const message = chatInput.value.trim();
  if (message) {
    addMessageToChatBox('You', message);
    chatInput.value = '';
    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
          prompt: message,
          max_tokens: 150
        })
      });
      const data = await response.json();
      const aiMessage = data.choices[0].text.trim();
      addMessageToChatBox('AI', aiMessage);
    } catch (error) {
      console.error('Error:', error);
      addMessageToChatBox('AI', 'Sorry, something went wrong.');
    }
  }
});

