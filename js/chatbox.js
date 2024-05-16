// Chat Box Functionality
document.addEventListener('DOMContentLoaded', function () {
  const chatBox = document.getElementById('chat-box');
  const closeChat = document.getElementById('close-chat');
  const sendMessageButton = document.getElementById('send-message');
  const chatInput = document.getElementById('chat-input');
  const chatBoxMessages = document.getElementById('chat-box-messages');
  const apiKey = process.env.API_KEY; // Replace with your OpenAI API key
  const apiEndpoint = 'https://platform.openai.com/playground/assistants?assistant=asst_sOahCcirt3x03jeXPEoDG5Nt'; // Replace with the correct endpoint

  closeChat.addEventListener('click', () => {
    chatBox.style.display = 'none';
  });

  sendMessageButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      addMessageToChatBox('You', message);
      chatInput.value = '';
      showLoadingSpinner();
      sendMessageToAPI(message).then(response => {
        hideLoadingSpinner();
        addMessageToChatBox('Assistant', response);
      }).catch(error => {
        hideLoadingSpinner();
        addMessageToChatBox('Assistant', 'Sorry, there was an error processing your request.');
      });
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

  async function sendMessageToAPI(message) {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: message,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
  }
});
