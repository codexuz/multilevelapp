// Function to interact with the ChatGPT API
async function chatWithGPT(message) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a student learning English.' },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    return reply;
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

// Function to handle user input and display chat messages
async function handleUserInput() {
  const userInput = document.getElementById('user-input');
  const messagesContainer = document.getElementById('messages');

 
  const message = userInput.value.trim();
  userInput.value = '';

 
  
  const userMessageContainer = document.createElement('div');
  const userMessageElement= document.createElement('div')
  userMessageContainer.classList.add('chat', 'chat-end', 'mt-1');
  userMessageElement.classList.add('chat-bubble', 'chat-bubble-accent');
  userMessageElement.textContent = message;
  userMessageContainer.appendChild(userMessageElement)
  messagesContainer.appendChild(userMessageContainer);

 const botTypingIndicatorContainer = document.createElement('div');
  botTypingIndicatorContainer.classList.add('chat', 'chat-start', 'chat-bubble');
  botTypingIndicatorElement=document.createElement('div');
  botTypingIndicatorElement.classList.add('')
  messagesContainer.appendChild(botTypingIndicatorContainer);

  const reply = await chatWithGPT(message);

  messagesContainer.removeChild(botTypingIndicatorElement); 
  // Check grammar and provide feedback
  const grammarFeedback = checkGrammar(message);
  const botMessageContainer = document.createElement('div');
  const botMessageElement = document.createElement('div');
  const chatImgBox = document.createElement('div')
  const Imgwidth = document.createElement('div')
  const chatImg = document.createElement('img')
  chatImgBox.classList.add('chat-image' , 'avatar')
  Imgwidth.classList.add('w-10', 'rounded-full')
  chatImg.src="/static/avatar.jpg"
  botMessageContainer.classList.add('chat', 'chat-start');
  botMessageElement.classList.add('chat-bubble', 'chat-bubble-primary')
  botMessageElement.textContent = grammarFeedback === null ? reply : `⚠️ ${grammarFeedback}\n\n${reply}`;
  if (grammarFeedback !== null) {
    botMessageElement.classList.add('red');
  }
  chatImgBox.appendChild(Imgwidth)
  Imgwidth.appendChild(chatImg)
  botMessageContainer.appendChild(chatImgBox)
  botMessageContainer.appendChild(botMessageElement)
  messagesContainer.appendChild(botMessageContainer);
}

// Function to check grammar and provide feedback
function checkGrammar(message) {
  // Implement your grammar checking logic here
  // You can use external libraries like Grammarly or build your own grammar checking rules
  // For simplicity, this example assumes that any sentence ending with a question mark '?' is considered incorrect
  if (message.trim().endsWith('?')) {
    return "It seems your sentence ends with a question mark. Please make sure to use proper sentence structure.";
  }
  return null; // Return null if grammar is correct
}

// Add event listener to the send button
const sendButton = document.getElementById('send-btn');
sendButton.addEventListener('click', handleUserInput);

// Example usage
async function init() {
  const initialMessage = 'Hello, I want to learn English.';
  const reply = await chatWithGPT(initialMessage);
  const messagesContainer = document.getElementById('messages');
/*
  const systemMessageElement = document.createElement('div');
  systemMessageElement.classList.add('message', 'system');
  systemMessageElement.textContent = 'You are a student learning English.';
  messagesContainer.appendChild(systemMessageElement);
*/
  const botMessageContainer = document.createElement('div');
  const botMessageElement = document.createElement('div')
  const chatImgBox = document.createElement('div')
  const Imgwidth = document.createElement('div')
  const chatImg = document.createElement('img')
  chatImgBox.classList.add('chat-image' , 'avatar')
  Imgwidth.classList.add('w-10', 'rounded-full')
  chatImg.src="/static/avatar.jpg"
  botMessageContainer.classList.add('chat', 'chat-start', 'mb-2')
  botMessageElement.classList.add('chat-bubble', 'chat-bubble-primary');
  botMessageElement.textContent = reply;
  chatImgBox.appendChild(Imgwidth)
  Imgwidth.appendChild(chatImg)
  botMessageContainer.appendChild(chatImgBox)
  botMessageContainer.appendChild(botMessageElement)
  messagesContainer.appendChild(botMessageContainer);
}

init();
