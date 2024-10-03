import { useState, useEffect } from 'react';

const useChat = (sessionId, user) => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [sessionId, setSessionId] = useState(null);
    const [sessionCreatedTime, setSessionCreatedTime] = useState(null);

    const generateSessionId = () => Math.random().toString(36).substring(2, 9);

    // Validate that input is not empty and in a reasonable length (200 words)
    const isValidInput = (message) => {
        const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
        return message.trim() !== '' && wordCount <= 200;
    };

    const handleSendMessage = () => {
        if (!isValidInput) return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: input, id: Date.now(), isUser: true },
        ]);

        setIsLoading(true);
        // Insert a sevice API call here
        // response = ChatService.getChatBotResponse(input, ...);

        fakeResponse = "Hi there. This is a fake AI response message";

        if (fakeResponse) {
            fakeAIMessage = {
                text: fakeResponse,
                timestamp: Date.now(),
                isUser: false
            }

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: fakeAIMessage, id: Date.now(), isUser: false },
            ]);
        } else {
            setError('Error occured while getting the AI response')
        }
        setIsLoading(false);
    };

    const handleInputChange = (event) => {
        text = event.target.value
        setInput(text);
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
                text: "I want to ask about CS675. What is it?",
                timestamp: Date.UTC(2024, 10, 2, 2),
                isUser: true
            },
            {
                text: "Sure! It is about blablabla",
                timestamp: Date.UTC(2024, 10, 2, 3),
                isUser: true
            }]

            if (existingMessages) {
                setMessages(existingMessages);
                setSessionId(sessionId);
                setIsLoading(false);
            } else {
                setError(existingMessages);
                setIsLoading(false);
            }
        } else {
            const newSessionId = generateSessionId();
            setSessionId(newSessionId);
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
        input,
        error,
        handleSendMessage,
        handleInputChange,
        sessionId,
        isLoading,
        sessionCreatedTime,
    };
};

export default useChat;
