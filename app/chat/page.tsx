"use client"
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const fetchBotResponse = (query: string) => {
  return fetch(`https://www.api.com/generate?query=${encodeURIComponent(query)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data.text);
};

export default async function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  const { refetch } = useQuery(
    ['chatbotResponse', input],
    () => fetchBotResponse(input),
    {
      enabled: false,
      onSuccess: (data) => {
        const botMessage: Message = { sender: 'bot', text: data };
        setMessages((prev) => [...prev, botMessage]);
      },
    }
  );

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    refetch();
    setInput('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.sender === 'user' ? styles.userMessage : styles.botMessage),
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button style={styles.button} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
  },
  chatBox: {
    flex: 1,
    width: '100%',
    maxWidth: '600px',
    overflowY: 'auto' as const,
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  inputBox: {
    display: 'flex',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#0070f3',
    color: '#fff',
    cursor: 'pointer',
  },
  message: {
    padding: '10px',
    borderRadius: '10px',
    margin: '5px 0',
  },
  userMessage: {
    backgroundColor: '#0070f3',
    color: '#fff',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
  },
};
