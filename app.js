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
        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3-8b-instruct`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',Authorization:`Bearer ${cloudflarekey}` },
          body: JSON.stringify({ message: `Suggest 3 songs for this mood: ${prompt}` })
        });

        if (!response.ok) throw new Error("The AI is currently off-stage.");

        const data = await response.json();
        return data.reply; 
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
  ],
      chatBox.appendChild(createMessageEl(text, true));
      userInput.value = '';
      const aiResponse = await getMusicAdvice(messages);
      if (aiResponse) {
        chatBox.appendChild(createMessageEl(aiResponse, false));
      }
      
      chatBox.scrollTop = chatBox.scrollHeight;
    });

