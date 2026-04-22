"use strict";


const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const errorMsg = document.getElementById('error-msg');
    const createMessageEl = (text, isUser) => {
      const div = document.createElement('div');
      div.className = isUser ? 'text-right mb-2' : 'text-left mb-2';
      const span = document.createElement('span');
      span.textContent = text;
      span.className = isUser ? 'bg-blue-100 p-2 rounded inline-block' : 'bg-gray-100 p-2 rounded inline-block';
      div.appendChild(span);
      return div;
    };
    async function getMusicAdvice(prompt) {
      try {
        errorMsg.classList.add('hidden'); 
        const response = await fetch(`https://corsproxy.io/?url= https://api.cloudflare.com/client/v4/accounts/1204f49cc96cbe4e9c58ab890fa08f22/ai/run/@cf/meta/llama-3-8b-instruct`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',Authorization:`Bearer ${cloudflarekey}` },
          body: JSON.stringify({messages:prompt})
        });

    

        const data = await response.json()
        console.log(data)
        return data.result; 
      } catch (err) {
        errorMsg.textContent = `Error: ${err.message}`;
        errorMsg.classList.remove('hidden');
        return null;
      }
    }
    sendBtn.addEventListener('click', async () => {
      const text = userInput.value.trim();
      if (!text) return;

      const messages= [
    {
      role: "system",
      content: "You are a friendly assistant that provides three songs from the user input",
    },
    {
      role: "user",
      content:
        text
    },
  ]
      chatBox.appendChild(createMessageEl(text, true));
      userInput.value = '';
      const aiResponse = await getMusicAdvice(messages);
      if (aiResponse) {
        chatBox.appendChild(createMessageEl(aiResponse.response,   false));
      }
      chatBox.scrollTop = chatBox.scrollHeight;
    });

