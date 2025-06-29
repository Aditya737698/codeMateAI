import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import logo from "./assets/logo.jpeg";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
      {
        role: "user",
        content: trimmed,
        timestamp: new Date().toLocaleTimeString(),
      },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/bug-assistant"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        }
      );

      const data = await res.json();

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.reply || "No reply received.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (err) {
      alert(`Request failed: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-10 px-4 flex flex-col items-center">
      {/* Chat Container (scrollable, includes header) */}
      <div
        ref={containerRef}
        className="w-full max-w-3xl bg-white rounded-xl px-6 pt-6 pb-2 mb-6 h-[70vh] overflow-y-auto space-y-6"
      >
        {/* Centered Header inside scroll area */}
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="Logo" className="w-14 h-14 rounded-full mb-2" />
          <h1 className="text-2xl font-bold text-blue-900 text-center">CodeMate AI</h1>
        </div>

        {/* Messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`w-full max-w-[85%] px-6 sm:px-10 lg:px-12 py-4 ${
              msg.role === "user" ? "self-end ml-auto text-right" : "self-start mr-auto text-left"
            }`}
          >
            <div className="text-xs mb-2 text-gray-500">
              {msg.role} @ {msg.timestamp}
            </div>
            <div className="prose prose-sm sm:prose-base max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-lg font-bold mt-4 mb-2">{children}</h2>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-3">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-3">{children}</ol>
                  ),
                  code: ({ className, children }) =>
                    className ? (
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
                        <code>{children}</code>
                      </pre>
                    ) : (
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                        {children}
                      </code>
                    ),
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-600">CodeMate is thinking...</div>
        )}
      </div>

      {/* Input + Clear Chat */}
      <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-3">
        <input
          className="flex-1 p-4 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
        <button
          onClick={clearChat}
          className="px-6 py-3 bg-gray-300 text-black rounded-full hover:bg-gray-400"
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
}