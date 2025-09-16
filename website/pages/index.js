import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [downloading, setDownloading] = useState(false);
  const handleDownload = () => {
    setDownloading(true);
    window.location.href = '/api/download/latest';
    setTimeout(() => setDownloading(false), 4000);
  };

  return (
    <>
      <Head>
        <title>Hireable — Your AI Interview & Meeting Assistant</title>
        <meta name="description" content="Hireable is a realtime AI assistant that helps you ace interviews and meetings. Download for Windows." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <nav className="nav">
          <div className="logo">Hireable</div>
          <div className="links">
            <Link href="https://github.com/Dennis-Rudiger/hireable" target="_blank" rel="noreferrer">GitHub</Link>
            <a href="#features">Features</a>
            <a href="#faq">FAQ</a>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-inner">
            <h1>Be ready for every question.</h1>
            <p>
              Hireable is your on-screen AI wingman for interviews, sales calls, and meetings. It listens, watches, and
              suggests what to say—live.
            </p>
            <div className="cta">
              <button className="btn" onClick={handleDownload} disabled={downloading}>
                {downloading ? 'Preparing download…' : 'Download for Windows (.exe)'}
              </button>
              <Link className="ghost" href="https://github.com/Dennis-Rudiger/hireable" target="_blank" rel="noreferrer">
                View on GitHub →
              </Link>
            </div>
            <div className="badges">
              <span>Windows</span>
              <span>macOS (coming soon)</span>
              <span>Linux (experimental)</span>
            </div>
          </div>
          <div className="glass"></div>
        </section>

        <section id="features" className="features">
          <h2>Why Hireable?</h2>
          <div className="grid">
            <div className="card">
              <h3>Realtime Guidance</h3>
              <p>Get instant suggestions tailored to the conversation—no alt-tabbing or prompts required.</p>
            </div>
            <div className="card">
              <h3>Profiles that Fit</h3>
              <p>Interview, Sales, Meeting, Presentation, Negotiation—fine-tuned prompts out of the box.</p>
            </div>
            <div className="card">
              <h3>Respectful Privacy</h3>
              <p>Content protection option and local controls to keep your assistive overlay discreet.</p>
            </div>
            <div className="card">
              <h3>Quick Ask</h3>
              <p>Summon a minimal overlay and ask anything via text or mic. Fast, focused answers.</p>
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
        </footer>
      </main>

      <style>{`
        :root {
          --bg: #0a0a0a;
          --text: #e5e5e7;
          --muted: #a1a1aa;
          --accent: #007aff;
          --card: rgba(255, 255, 255, 0.04);
          --border: rgba(255, 255, 255, 0.08);
        }
        html, body, main { height: 100%; }
        body { margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: radial-gradient(1200px 800px at 20% -10%, #1c1c22, transparent 50%), radial-gradient(1000px 700px at 120% 20%, #121219, transparent 50%), var(--bg); color: var(--text); }
        a { color: var(--accent); text-decoration: none; }
        .nav { display:flex; align-items:center; justify-content:space-between; padding:16px 24px; position:sticky; top:0; backdrop-filter:saturate(1.8) blur(12px); background: rgba(10,10,10,0.5); border-bottom: 1px solid var(--border); z-index:10; }
        .logo { font-weight: 700; letter-spacing: 0.4px; }
        .links { display:flex; gap:16px; }
        .hero { position:relative; padding: 72px 24px 40px; display:flex; align-items:center; justify-content:center; text-align:center; }
        .hero-inner { max-width: 880px; }
        h1 { font-size: clamp(36px, 6vw, 64px); margin: 0 0 12px; letter-spacing: -0.02em; }
        p { font-size: 18px; color: var(--muted); margin: 0 auto 20px; max-width: 720px; }
        .cta { display:flex; gap: 12px; align-items:center; justify-content:center; margin: 16px 0 8px; flex-wrap:wrap; }
        .btn { background: white; color: black; border: 1px solid #fff; padding: 12px 18px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: transform .08s ease, box-shadow .2s ease; }
        .btn:hover { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(0,0,0,.35); }
        .btn:disabled { opacity: .7; cursor: wait; }
        .ghost { padding: 10px 14px; border-radius: 10px; border: 1px solid var(--border); color: var(--text); background: rgba(255,255,255,.02); }
        .badges { display:flex; gap:10px; justify-content:center; color:#b4b4b8; font-size: 12px; margin-top: 8px; }
        .glass { position:absolute; inset: 16px; border-radius: 16px; pointer-events:none; background: linear-gradient(to bottom, rgba(255,255,255,.08), transparent 30%), radial-gradient(600px 200px at 50% 0%, rgba(255,255,255,.12), transparent 70%); mix-blend-mode: screen; opacity:.5; }
        .features { padding: 30px 24px 12px; max-width: 1100px; margin: 0 auto; }
        .features h2 { text-align:center; margin: 0 0 14px; font-size: 26px; }
        .grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
        .card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; backdrop-filter: blur(12px); }
        .card h3 { margin: 0 0 6px; font-size: 16px; }
        .card p { margin: 0; font-size: 14px; color: #c9c9cf; }
        .faq { padding: 24px; max-width: 900px; margin: 0 auto 40px; }
        .faq h2 { text-align:center; font-size: 24px; margin-bottom: 12px; }
        details { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; margin: 8px 0; }
        .footer { display:flex; gap:12px; align-items:center; justify-content:center; border-top: 1px solid var(--border); padding: 20px; color: #a1a1aa; }
      `}</style>
    </>
  );
}
