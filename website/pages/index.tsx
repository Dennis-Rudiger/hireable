import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [downloading, setDownloading] = useState(false);
  const paypalUrl = process.env.NEXT_PUBLIC_PAYPAL_URL || 'https://paypal.me/dennisrudiger';

  const handleDownload = () => {
    setDownloading(true);
    window.location.href = '/api/download/latest';
    setTimeout(() => setDownloading(false), 4000);
  };

  return (
    <>
      <Head>
        <title>Hireable — Your AI Interview & Meeting Copilot</title>
        <meta name="description" content="Hireable is a realtime AI assistant that helps you ace interviews and meetings. Now with Native Audio processing for ultra-low latency." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <nav className="nav">
          <div className="logo">Hireable</div>
          <div className="links">
            <a href="#features">Features</a>
            <a href="#faq">FAQ</a>
            <Link href="https://github.com/Dennis-Rudiger/hireable" target="_blank" rel="noreferrer">GitHub</Link>
            <Link href={paypalUrl} target="_blank" rel="noreferrer" className="nav-btn">
              Buy me a coffee ☕
            </Link>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-inner">
            <h1>Be ready for every question.</h1>
            <p>
              Hireable is your on-screen AI copilot for interviews, sales calls, and meetings. It listens to system audio & your mic simultaneously, suggesting what to say—live.
            </p>
            <div className="cta">
              <button className="btn" onClick={handleDownload} disabled={downloading}>
                {downloading ? 'Starting download…' : 'Download for Windows 10/11'}
              </button>
              <Link className="ghost" href="https://github.com/Dennis-Rudiger/hireable" target="_blank" rel="noreferrer">
                View Source
              </Link>
            </div>
            <div className="badges">
              <span>Windows (x64)</span>
              <span>macOS & Linux (Planned)</span>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <h2>Why Hireable?</h2>
          <div className="grid">
            <div className="card">
              <h3>Realtime Copilot</h3>
              <p>Get instant suggestions tailored to the conversation processing both system audio and your microphone.</p>
            </div>
            <div className="card">
              <h3>Native Audio Speed</h3>
              <p>Built on Gemini 2.5 Flash with Native Audio. Experience ultra-low latency responses that feel like magic.</p>
            </div>
            <div className="card">
              <h3>Profiles that Fit</h3>
              <p>Interview, Sales, Meeting, Presentation, Negotiation—fine-tuned prompts ready out of the box.</p>
            </div>
            <div className="card">
              <h3>Quick Ask</h3>
              <p>Summon a minimal overlay to ask anything via text or voice. Perfect for quick fact-checking.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="faq">
          <h2>FAQ</h2>
          <details>
            <summary>Is Hireable free?</summary>
            <p>Hireable is open-source. You’ll need a Google Gemini API key for AI features.</p>
          </details>
          <details>
            <summary>Will there be macOS builds?</summary>
            <p>Yes. macOS builds are planned; Windows is available now.</p>
          </details>
          <details>
            <summary>Where do I report issues?</summary>
            <p>
              Please open an issue on <a href="https://github.com/Dennis-Rudiger/hireable" target="_blank" rel="noreferrer">GitHub</a>.
            </p>
          </details>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Hireable</span>
          <Link href="https://github.com/Dennis-Rudiger/hireable" target="_blank" rel="noreferrer">GitHub</Link>
          <Link href={paypalUrl} target="_blank" rel="noreferrer">Donate via PayPal</Link>
        </footer>
      </main>

  <style jsx global>{`
        :root {
          --bg: #020202;
          --text: #f8fafc;
          --muted: #94a3b8;
          --card-bg: rgba(2, 44, 34, 0.3);
          --card-border: rgba(255, 255, 255, 0.08);
          --card-hover-border: rgba(34, 197, 94, 0.5);
          --accent: #22c55e;
          --accent-pink: #ec4899;
        }

        @keyframes move-aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        html, body { height: 100%; box-sizing: border-box; }
        body { 
          margin: 0; 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
          background-color: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          line-height: 1.5;
        }
        
        /* Enforce global link color to fix visibility issues */
        a { color: #f8fafc; text-decoration: none; transition: all 0.2s; }
        a:hover { color: #22c55e; }

        /* Ambient Background */
        body::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            radial-gradient(circle at 50% 50%, rgba(22, 101, 52, 0.15), transparent 50%),
            radial-gradient(circle at 15% 25%, rgba(6, 78, 59, 0.3), transparent 40%),
            radial-gradient(circle at 85% 75%, rgba(236, 72, 153, 0.12), transparent 40%);
          filter: blur(80px);
          z-index: -2;
          animation: move-aurora 20s ease infinite;
        }

        /* Noise Texture */
        body::after {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -1;
          opacity: 0.035;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      <style jsx>{`
        main { height: 100%; box-sizing: border-box; }
        *, *:before, *:after { box-sizing: inherit; }
        
        a { color: var(--text); text-decoration: none; transition: color 0.2s; }
        a:hover { color: var(--accent); }
        
        /* Floating Nav */
        .nav { 
          display:flex; align-items:center; justify-content:space-between; 
          padding: 16px 32px; 
          position: sticky; 
          top: 24px; 
          z-index: 100;
          max-width: 1000px;
          margin: 0 auto;
          background: rgba(2, 2, 2, 0.6);
          backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 99px;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
        }
        .logo { 
          font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em; 
          color: #fff;
        }
        .links { display:flex; gap:24px; font-size: 0.9rem; font-weight: 500; }
        .links a { color: var(--muted); transition: all 0.2s ease; }
        .links a:hover { color: #fff; }
        
        /* Hero Section */
        .hero { 
          position:relative; 
          padding: 120px 24px 80px; 
          display:flex; flex-direction: column; align-items:center; text-align:center; 
          min-height: 80vh; justify-content: center;
        }
        .hero-inner { max-width: 800px; z-index: 2; position: relative; }
        
        h1 { 
          font-size: clamp(48px, 7vw, 96px); 
          line-height: 1.05; 
          margin: 0 0 32px; 
          letter-spacing: -0.04em; 
          font-weight: 800;
          background: linear-gradient(to bottom right, #f0fdf4 20%, #4ade80 60%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        p { 
          font-size: 1.25rem; color: var(--muted); 
          margin: 0 auto 48px; max-width: 600px; 
          line-height: 1.6; font-weight: 400;
        }
        
        /* Buttons */
        .cta { display:flex; gap: 16px; align-items:center; justify-content:center; flex-wrap:wrap; }
        .btn { 
          background: linear-gradient(90deg, #16a34a, #bef264, #16a34a);
          background-size: 200% auto;
          color: #022c22; 
          border: none; 
          padding: 16px 32px; 
          border-radius: 99px; 
          font-weight: 700; 
          font-size: 1rem;
          cursor: pointer; 
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
        }
        .btn:hover { 
          transform: scale(1.02); 
          animation: shine 3s linear infinite;
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.4);
        }
        
        .ghost { 
          padding: 16px 32px; 
          border-radius: 99px; 
          border: 1px solid var(--card-border); 
          color: var(--text); 
          background: rgba(255,255,255,0.03); 
          font-weight: 500;
          font-size: 1rem;
        }
        .ghost:hover { 
          background: rgba(255,255,255,0.08); 
          border-color: #fff;
        }
        
        .badges { 
          display:flex; gap:24px; justify-content:center; 
          color: var(--muted); font-size: 0.85rem; margin-top: 48px; 
          font-weight: 500; opacity: 0.7; 
        }
        
        /* Features Grid */
        .features { padding: 120px 24px; max-width: 1200px; margin: 0 auto; }
        .features h2 { 
          text-align:center; margin: 0 0 80px; font-size: 2.5rem; 
          font-weight: 700; letter-spacing: -0.03em;
        }
        .grid { 
          display:grid; 
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
          gap: 24px; 
        }
        
        .card { 
          background: var(--card-bg); 
          border: 1px solid var(--card-border); 
          border-radius: 24px; 
          padding: 40px; 
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.4), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .card:hover { 
          transform: translateY(-8px); 
          border-color: var(--card-hover-border);
          background: rgba(2, 44, 34, 0.6);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
        }
        .card:hover::before { opacity: 1; }
        
        .card h3 { 
          margin: 0 0 12px; font-size: 1.25rem; font-weight: 600; color: #fff; 
        }
        .card p { 
          margin: 0; font-size: 1rem; color: var(--muted); line-height: 1.6; 
        }
        
        /* FAQ Section */
        .faq { padding: 80px 24px; max-width: 800px; margin: 0 auto 120px; }
        .faq h2 { text-align:center; font-size: 2rem; margin-bottom: 48px; letter-spacing: -0.02em; }
        details { 
          background: rgba(255,255,255,0.01);
          border: 1px solid var(--card-border); 
          border-radius: 16px;
          padding: 20px 24px; 
          margin-bottom: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }
        details:hover { 
          background: rgba(255,255,255,0.03); 
          border-color: rgba(255,255,255,0.15);
        }
        details[open] { background: rgba(5, 46, 22, 0.3); border-color: rgba(34, 197, 94, 0.2); }
        summary { font-weight: 500; font-size: 1.05rem; outline: none; list-style: none; display: flex; align-items: center; justify-content: space-between; color: #eee; }
        summary::-webkit-details-marker { display:none; }
        summary::after { content: '+'; font-size: 1.5rem; font-weight: 300; color: var(--muted); }
        details[open] summary::after { content: '−'; }
        details p { margin: 16px 0 0; color: var(--muted); line-height: 1.6; font-size: 1rem; padding-right: 24px; }
        
        /* Footer */
        .footer { 
          display:flex; gap:32px; align-items:center; justify-content:center; 
          padding: 80px 24px 40px; 
          color: var(--muted); font-size: 0.9rem;
          border-top: 1px solid var(--card-border);
        }
        .footer a { 
            color: #fff; 
            text-decoration: underline; 
            text-decoration-color: var(--accent);
        }
        .footer a:hover { 
            color: var(--accent);
            text-decoration-color: transparent;
        }

        .nav-btn {
          background: linear-gradient(90deg, #ec4899, #db2777);
          color: #fff !important;
          padding: 10px 20px;
          border-radius: 99px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 10px rgba(236, 72, 153, 0.4);
        }
        .nav-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 15px rgba(236, 72, 153, 0.6);
        }

        @media (max-width: 768px) {
          .nav { top: 0; border-radius: 0; width: 100%; border-left: 0; border-right: 0; border-top: 0; flex-direction: column; gap: 16px; padding: 24px; }
          .hero { padding-top: 100px; }
          h1 { font-size: 48px; }
          .links { flex-wrap: wrap; justify-content: center; width: 100%; gap: 16px; }
        }
  `}</style>
    </>
  );
}
