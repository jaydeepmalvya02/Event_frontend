import { useState, useRef, useEffect } from "react";
import axios from "axios";

function ChatComponent() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [displayedReply, setDisplayedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const replyRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setReply("");
    setDisplayedReply("");
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/chat", {
        prompt,
      });
      setReply(res.data.reply);
    } catch (err) {
      console.error(err);
      setError("⚠️ Could not fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!reply) return;

    let index = 0;
    setDisplayedReply("");
    const interval = setInterval(() => {
      setDisplayedReply((prev) => prev + reply.charAt(index));
      index++;
      if (index >= reply.length) {
        clearInterval(interval);
      }
    }, 20); // typing speed in ms per character

    return () => clearInterval(interval);
  }, [reply]);

  useEffect(() => {
    if (replyRef.current) {
      replyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayedReply]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          AI Chat
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something..."
            className="w-full h-32 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>

        {error && (
          <div className="mt-4 bg-red-100 text-red-700 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

        {displayedReply && (
          <div
            ref={replyRef}
            className="mt-6 bg-gray-50 border border-gray-200 rounded-md p-4"
          >
            <h2 className="font-semibold text-gray-700 mb-2">Response:</h2>
            <p className="text-gray-800 whitespace-pre-wrap">
              {displayedReply}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatComponent;
