import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const useChat = (sessionId) => {
    
    const { user } = useUser();
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [sessionCreatedTime, setSessionCreatedTime] = useState(null);

    const generateSessionId = () => Math.random().toString(36).substring(2, 9);

    // Validate that input is not empty and in a reasonable length (200 words)
    const isValidInput = (message) => {
        const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
        return message.trim() !== '' && wordCount <= 200;
    };

    const handleSendMessage = (input) => {
        if (!isValidInput(input)) return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: input, id: Date.now(), isUser: true },
        ]);

        setIsLoading(true);
        // Insert a sevice API call here
        // response = ChatService.getChatBotResponse(input, ...);

        const fakeResponse = "Hi there. This is a fake AI response message";

        if (fakeResponse) {
            const AIMessage = {
                text: fakeResponse,
                timestamp: Date.now(),
                isUser: false
            }

            setMessages((prevMessages) => [
                ...prevMessages,
                AIMessage,
            ]);

        } else {
            setError('Error occured while getting the AI response')
        }
        setIsLoading(false);
    };

    // Initialize chat session when the hook is first used
    const initChatSession = async () => {
        const isExisted = user.chat_session_ids.includes(sessionId);

        if (isExisted) {
            // Load chat messages from the API
            // existingMessages = ChatService.getChatHistory();
            // Fake messages
            const existingMessages = [{
                text: "Hi John! How can I help you today?",
                timestamp: Date.UTC(2024, 10, 2, 0),
                isUser: false
            },
            {
                text: "I want to ask about CS675. What is it?",
                timestamp: Date.UTC(2024, 10, 2, 1),
                isUser: true
            },
            {
                text: "Sure! It is about blablabla",
                timestamp: Date.UTC(2024, 10, 2, 2),
                isUser: false
            },
            {
                text: "Is it hard?",
                timestamp: Date.UTC(2024, 10, 2, 3),
                isUser: true
            },
            {
                text: "Not really",
                timestamp: Date.UTC(2024, 10, 2, 4),
                isUser: false
            },
        ]

            if (existingMessages) {
                setMessages(existingMessages);
                setIsLoading(false);
            } else {
                setError(existingMessages);
                setIsLoading(false);
            }
        } else {
            const newSessionId = generateSessionId();
            setMessages([{
                text: `Hi ${user.firstName}! How can I help you today?`,
                timestamp: Date.now(),
                isUser: false,
            }]);
            setSessionCreatedTime(Date.now());
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initChatSession();
    }, []);

    return {
        messages,
        error,
        handleSendMessage,
        sessionId,
        isLoading,
        sessionCreatedTime,
    };
};

export default useChat;
