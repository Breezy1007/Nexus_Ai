import { useState } from "react";
import Head from "next/head";

const CONTENT_TYPES = [
  { id: "instagram", label: "Instagram Post", icon: "📸", ar: "بوست إنستغرام" },
  { id: "email", label: "Email Campaign", icon: "📧", ar: "إيميل ماركيتينغ" },
  { id: "ads", label: "Google Ads", icon: "📢", ar: "إعلان جوجل" },
  { id: "product", label: "Product Description", icon: "🛍️", ar: "وصف المنتج" },
  { id: "slogan", label: "Brand Slogan", icon: "✨", ar: "سلوغان" },
  { id: "general", label: "General AI", icon: "🤖", ar: "AI عام" },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("general");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    setCopied(false);

    const selectedLabel = CONTENT_TYPES.find((t) => t.id === selectedType);
    const fullPrompt =
      selectedType === "general"
        ? prompt
        : `Generate a ${selectedLabel.label} for: ${prompt}`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt, type: selectedType }),
      });
      const data = await res.json();
      if (data.result) {
        setResult(data.result);
      } else {
        setResult("Error: " + JSON.stringify(data.error));
      }
    } catch (err) {
      setResult("Error: " + err.message);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>NexusAI — Business Content Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="app">
        {/* Background */}
        <div className="bg-grid" />
        <div className="bg-glow" />

        {/* Header */}
        <header className="header">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">NexusAI</span>
          </div>
          <div className="header-badge">Powered by Groq</div>
        </header>

        {/* Hero */}
        <section className="hero">
          <div className="hero-tag">🚀 AI Business Content</div>
          <h1 className="hero-title">
            Create Content That
            <br />
            <span className="hero-accent">Converts & Sells</span>
          </h1>
          <p className="hero-sub">
            Generate marketing content, ads, and campaigns in seconds
          </p>
        </section>

        {/* Main Card */}
        <main className="main">
          <div className="card">
            {/* Content Type Selector */}
            <div className="type-grid">
              {CONTENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  className={`type-btn ${selectedType === type.id ? "active" : ""}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <span className="type-icon">{type.icon}</span>
                  <span className="type-label">{type.ar}</span>
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="input-wrap">
              <textarea
                className="input"
                rows={4}
                placeholder="اكتب هنا... مثال: متجر ملابس شبابية، كوليكشن صيف 2026"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) generate();
                }}
                dir="auto"
              />
              <div className="input-hint">Ctrl + Enter للتوليد</div>
            </div>

            {/* Generate Button */}
            <button
              className={`generate-btn ${loading ? "loading" : ""}`}
              onClick={generate}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <span>⚡</span>
                  توليد المحتوى
                </>
              )}
            </button>

            {/* Result */}
            {result && (
              <div className="result-wrap">
                <div className="result-header">
                  <span className="result-label">✅ النتيجة</span>
                  <button className="copy-btn" onClick={handleCopy}>
                    {copied ? "✓ تم النسخ" : "نسخ"}
                  </button>
                </div>
                <div className="result-text" dir="auto">
                  {result}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>NexusAI © 2026 — Built for Business Success</p>
        </footer>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --bg: #050508;
          --surface: #0d0d14;
          --border: rgba(255, 255, 255, 0.08);
          --accent: #00e5ff;
          --accent2: #7c3aed;
          --text: #f0f0f5;
          --muted: #6b6b80;
          --success: #00e5a0;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: "DM Sans", sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .app {
          min-height: 100vh;
          position: relative;
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          background-image: linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .bg-glow {
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .header {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 32px;
          border-bottom: 1px solid var(--border);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-icon {
          font-size: 24px;
        }

        .logo-text {
          font-family: "Syne", sans-serif;
          font-size: 22px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-badge {
          font-size: 12px;
          color: var(--muted);
          border: 1px solid var(--border);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .hero {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 60px 20px 40px;
        }

        .hero-tag {
          display: inline-block;
          font-size: 13px;
          color: var(--accent);
          border: 1px solid rgba(0, 229, 255, 0.2);
          background: rgba(0, 229, 255, 0.05);
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 20px;
          animation: fadeUp 0.6s ease both;
        }

        .hero-title {
          font-family: "Syne", sans-serif;
          font-size: clamp(32px, 6vw, 56px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 16px;
          animation: fadeUp 0.6s ease 0.1s both;
        }

        .hero-accent {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-sub {
          font-size: 16px;
          color: var(--muted);
          animation: fadeUp 0.6s ease 0.2s both;
        }

        .main {
          position: relative;
          z-index: 10;
          max-width: 720px;
          margin: 0 auto;
          padding: 0 20px 60px;
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
          animation: fadeUp 0.6s ease 0.3s both;
        }

        .type-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 24px;
        }

        .type-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 14px 10px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--muted);
        }

        .type-btn:hover {
          border-color: rgba(0, 229, 255, 0.3);
          color: var(--text);
          background: rgba(0, 229, 255, 0.04);
        }

        .type-btn.active {
          border-color: var(--accent);
          background: rgba(0, 229, 255, 0.08);
          color: var(--accent);
        }

        .type-icon {
          font-size: 20px;
        }

        .type-label {
          font-size: 12px;
          font-weight: 500;
          text-align: center;
        }

        .input-wrap {
          position: relative;
          margin-bottom: 16px;
        }

        .input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          color: var(--text);
          font-family: "DM Sans", sans-serif;
          font-size: 15px;
          resize: none;
          transition: border-color 0.2s;
          outline: none;
        }

        .input:focus {
          border-color: rgba(0, 229, 255, 0.4);
        }

        .input::placeholder {
          color: var(--muted);
        }

        .input-hint {
          font-size: 11px;
          color: var(--muted);
          text-align: right;
          margin-top: 6px;
        }

        .generate-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          border: none;
          border-radius: 12px;
          color: white;
          font-family: "Syne", sans-serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 229, 255, 0.2);
        }

        .generate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .result-wrap {
          margin-top: 24px;
          border: 1px solid rgba(0, 229, 160, 0.2);
          border-radius: 12px;
          overflow: hidden;
          animation: fadeUp 0.4s ease both;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: rgba(0, 229, 160, 0.06);
          border-bottom: 1px solid rgba(0, 229, 160, 0.1);
        }

        .result-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--success);
        }

        .copy-btn {
          font-size: 12px;
          padding: 4px 12px;
          background: rgba(0, 229, 160, 0.1);
          border: 1px solid rgba(0, 229, 160, 0.2);
          border-radius: 8px;
          color: var(--success);
          cursor: pointer;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          background: rgba(0, 229, 160, 0.2);
        }

        .result-text {
          padding: 20px;
          font-size: 15px;
          line-height: 1.8;
          color: var(--text);
          white-space: pre-wrap;
          word-break: break-word;
        }

        .footer {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 20px;
          color: var(--muted);
          font-size: 13px;
          border-top: 1px solid var(--border);
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 16px 20px;
          }
          .type-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .card {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}
