import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [tone, setTone] = useState("Professional");
  const [language, setLanguage] = useState("English");
  const [rewrittenText, setRewrittenText] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRewrite = async () => {
    if (!text.trim()) return;

    setProcessing(true);
    setRewrittenText("");

    try {
      const res = await fetch("http://localhost:5000/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone, language }),
      });

      const data = await res.json();
      setRewrittenText(data.rewrittenText);
    } catch (err) {
      console.error(err);
      setRewrittenText("❌ Error: Could not rewrite text");
    }

    setProcessing(false);
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center h-screen w-screen bg-black text-white"
          >
            {/* Rotating Circle with Static Logo */}
            <motion.div
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-purple-400 border-t-transparent flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/erxuunyq.json"
                  trigger="loop"
                  colors="primary:#a855f7,secondary:#f43f5e"
                  style={{ width: "70px", height: "70px" }}
                  className="sm:w-[100px] sm:h-[100px]"
                ></lord-icon>
              </motion.div>
            </motion.div>

            <p className="mt-6 text-lg sm:text-xl text-white">
              Loading ToneCraft...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 text-white"
          >
            {/* Logo + Title */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <lord-icon
                src="https://cdn.lordicon.com/erxuunyq.json"
                trigger="hover"
                colors="primary:#a855f7,secondary:#f43f5e"
                style={{ width: "70px", height: "70px" }}
                className="sm:w-[100px] sm:h-[100px] -translate-y-2 sm:-translate-y-5"
              ></lord-icon>

              <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 sm:mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg text-center sm:text-left">
                ToneCraft
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-white mb-6 sm:mb-10 text-base sm:text-lg text-center max-w-xl sm:max-w-3xl">
              Type your text, pick a tone & language, hit Rewrite, and watch your words transform instantly!
            </p>

            {/* Input Textarea */}
            <textarea
              className="w-full max-w-xl sm:max-w-2xl p-3 sm:p-4 mb-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              rows="5"
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-6 w-full max-w-xl sm:max-w-2xl">
              <select
                className="flex-1 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition cursor-pointer"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option className="text-black">Professional</option>
                <option className="text-black">Friendly</option>
                <option className="text-black">Casual</option>
                <option className="text-black">Polite</option>
                <option className="text-black">Funny</option>
              </select>

              <select
                className="flex-1 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option className="text-black">English</option>
                <option className="text-black">Spanish</option>
                <option className="text-black">French</option>
                <option className="text-black">German</option>
                <option className="text-black">Japanese</option>
                <option className="text-black">Hindi</option>
                <option className="text-black">Mandarin Chinese</option>
              </select>
            </div>

            {/* Button */}
            <button
              onClick={handleRewrite}
              disabled={processing}
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-purple-500/50 transition-transform duration-300 disabled:opacity-50"
            >
              {processing ? "✨ Rewriting..." : "Rewrite"}
            </button>

            {/* Rewritten Text */}
            {rewrittenText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-6 sm:mt-8 w-full max-w-xl sm:max-w-2xl p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-pink-400">
                  Rewritten Text:
                </h2>
                <p className="text-gray-200 text-sm sm:text-base">{rewrittenText}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
