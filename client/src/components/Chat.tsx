import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed } as Message,
    ];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("http://127.0.0.1:8000/api/bug-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-50">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        Smart Issue Tracker 🐞
      </h1>

      {/* Chat box */}
      <div className="w-full max-w-2xl bg-white border rounded-xl shadow p-4 flex flex-col h-[500px]">
        {/* Scrollable messages */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto space-y-3 mb-4 p-2 bg-gray-50 rounded"
        >
          {messages.length === 0 ? (
            <p className="text-gray-500 italic">
              Start by describing your bug...
            </p>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded ${
                  m.role === "user"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-green-100 text-green-900"
                }`}
              >
                <strong className="capitalize">{m.role}:</strong>{" "}
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            ))
          )}
        </div>

        {/* Input & actions */}
        <div className="flex gap-2">
          <input
            className="flex-1 border p-3 rounded"
            placeholder="Describe your bug..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}