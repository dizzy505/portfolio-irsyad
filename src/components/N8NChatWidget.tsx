import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const N8NChatWidget = () => {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Store a reference to the chat container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'n8n-chat-container';
    chatContainer.style.position = 'absolute';
    chatContainer.style.bottom = '0';
    chatContainer.style.right = '0';
    chatContainer.style.zIndex = '40';
    chatContainer.style.width = '360px';
    chatContainer.style.maxWidth = 'calc(100vw - 32px)';
    chatContainer.style.maxHeight = 'calc(100vh - 140px)';
    chatContainer.style.display = 'flex';
    chatContainer.style.flexDirection = 'column';
    chatContainer.style.borderRadius = '12px';
    chatContainer.style.overflow = 'hidden';
    chatContainer.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
    
    document.body.appendChild(chatContainer);

    // Initialize the chat with custom styles and welcome message
    createChat({
      webhookUrl: 'https://rayn-coogler.app.n8n.cloud/webhook/e5616171-e3b5-4c39-81d4-67409f9fa60a/chat',
      target: chatContainer,
      showWelcomeScreen: false, // Disable the default welcome screen
      initialMessages: [
        'Halo! Saya asisten virtual Irsyad. Ada yang bisa saya bantu?',
      ],
      theme: {
        primary: '#4f46e5',
        secondary: '#6366f1',
        textPrimary: '#1f2937',
        textSecondary: '#4b5563',
        background: '#ffffff',
        chatBackground: '#f9fafb',
        userMessageBackground: '#4f46e5',
        userMessageText: '#ffffff',
        botMessageBackground: '#f3f4f6',
        botMessageText: '#1f2937',
      },
      i18n: {
        en: {
          title: 'ChadGPT',
          subtitle: 'Irsyad Personal Assistant',
          welcome: 'Halo! Saya asisten virtual Irsyad. Ada yang bisa saya bantu?',
          footer: '© 2025 Irsyad Faruq',
          getStarted: 'Mulai Chat',
          inputPlaceholder: 'Ketik pesan Anda...',
          closeButtonTooltip: 'Tutup',
          sendButton: 'Kirim',
        },
      } as const,
    });

    // Cleanup function
    return () => {
      // Remove the chat container from the DOM
      if (document.body.contains(chatContainer)) {
        document.body.removeChild(chatContainer);
      }
    };
  }, []);

  return null; // This component doesn't render anything itself
};

export default N8NChatWidget;
