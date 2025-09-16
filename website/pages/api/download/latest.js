export default async function handler(req, res) {
  try {
    // If an explicit asset URL is configured, redirect immediately
    const override = process.env.NEXT_PUBLIC_DOWNLOAD_EXE_URL || process.env.DOWNLOAD_EXE_URL;
    if (override && typeof override === 'string') {
      res.setHeader('Cache-Control', 'no-store');
      return res.redirect(302, override);
    }

    const releasesRes = await fetch('https://api.github.com/repos/Dennis-Rudiger/hireable/releases');
    if (!releasesRes.ok) {
      return res.status(502).json({ error: 'Failed to fetch releases from GitHub' });
    }
    const releases = await releasesRes.json();
    // Find first release with a Windows .exe asset (prefer non-prerelease)
    const sorted = releases.sort((a, b) => new Date(b.published_at || 0) - new Date(a.published_at || 0));
    const findAsset = (rels) => {
      for (const r of rels) {
        const asset = (r.assets || []).find(a => a.name && a.name.endsWith('.exe'));
        if (asset) return asset;
      }
      return null;
    };
    const stable = sorted.filter(r => !r.prerelease && !r.draft);
    let asset = findAsset(stable);
    if (!asset) asset = findAsset(sorted);

    if (!asset) {
      // Fallback: query the /releases/latest endpoint as a secondary source
      const latestRes = await fetch('https://api.github.com/repos/Dennis-Rudiger/hireable/releases/latest');
      if (latestRes.ok) {
        const latest = await latestRes.json();
        const latestAsset = (latest.assets || []).find(a => a.name && a.name.endsWith('.exe'));
        if (latestAsset) {
          res.setHeader('Cache-Control', 'no-store');
          return res.redirect(302, latestAsset.browser_download_url);
        }
      }
      return res.status(404).json({ error: 'No Windows .exe release asset found' });
    }

    // Redirect to browser_download_url so GitHub serves the file
    res.setHeader('Cache-Control', 'no-store');
    return res.redirect(302, asset.browser_download_url);
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error', message: String(e) });
  }
}
