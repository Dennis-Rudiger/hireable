// Minimal Live API connectivity smoke test (Node)
// Usage: set GOOGLE_API_KEY in environment, then run `npm run smoke:live`

const { GoogleGenAI } = require('@google/genai');

(async () => {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Missing GOOGLE_API_KEY environment variable.');
    process.exit(2);
  }
  const ai = new GoogleGenAI({ apiKey });
  try {
    const session = await ai.live.connect({
      model: 'gemini-live-2.5-flash-preview',
      callbacks: {
        onopen: () => console.log('Live session connected OK'),
        onerror: (e) => console.error('Live session error:', e?.message || e),
        onclose: (e) => console.log('Live session closed:', e?.reason || ''),
        onmessage: (m) => {
          if (m?.serverContent?.inputTranscription?.text) {
            process.stdout.write(`[in] ${m.serverContent.inputTranscription.text}`);
          }
          if (m?.serverContent?.modelTurn?.parts) {
            for (const p of m.serverContent.modelTurn.parts) {
              if (p.text) process.stdout.write(`[out] ${p.text}`);
            }
          }
          if (m?.serverContent?.generationComplete) {
            console.log('\nGeneration complete.');
          }
        },
      },
      config: {
        responseModalities: ['TEXT'],
        inputAudioTranscription: {},
        contextWindowCompression: { slidingWindow: {} },
        systemInstruction: { parts: [{ text: 'You are a helpful assistant.' }] },
      },
    });

    // Send a tiny audio ping (silence) and a short text prompt to validate both paths
    await session.sendRealtimeInput({
      audio: { data: Buffer.alloc(1600).toString('base64'), mimeType: 'audio/pcm;rate=16000' },
    });
    await session.sendRealtimeInput({ text: 'Say hello in one short sentence.' });

    // Allow a short time to receive messages then close
    setTimeout(async () => {
      await session.close();
      process.exit(0);
    }, 3000);
  } catch (err) {
    console.error('Smoke test failed:', err?.message || err);
    process.exit(1);
  }
})();
