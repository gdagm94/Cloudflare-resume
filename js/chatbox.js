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
      showLoadingSpinner();
      // Here you would add the code to send the message to your OpenAI API and handle the response
      sendMessageButton.addEventListener('click', async () => {
  const message = chatInput.value.trim();
  if (message) {
    addMessageToChatBox('You', message);
    chatInput.value = '';
    try {
      const response = await fetch('https://platform.openai.com/playground/assistants?assistant=asst_sOahCcirt3x03jeXPEoDG5Nt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `RESUME`
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

      setTimeout(() => {
        hideLoadingSpinner();
        addMessageToChatBox('Assistant', 'This is a response from the assistant.'); // Replace this line with the actual API response
      }, 2000); // Simulate a delay for the response
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

  function showLoadingSpinner() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    loadingSpinner.id = 'loading-spinner';
    chatBoxMessages.appendChild(loadingSpinner);
    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight;
  }

  function hideLoadingSpinner() {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
      loadingSpinner.remove();
    }
  }
});
