// Chooses which version of the site to boot at load time.
// "/old" and "/old/*"  → archived V1 site
// "/v2"  and "/v2/*"   → archived V2 site
// "/v4"  and "/v4/*"   → new Cura Climate inspired V4 site
// everything else      → current V3 site
// Dynamic imports keep each version's global stylesheet isolated
// (switching versions is always a full page load via VersionToggle).
const { pathname } = window.location
const isOld = pathname === '/old' || pathname.startsWith('/old/')
const isV2  = pathname === '/v2'  || pathname.startsWith('/v2/')
const isV4  = pathname === '/v4'  || pathname.startsWith('/v4/') || pathname === '/technology' || pathname.startsWith('/technology/')

// One loader per version, kept as separate functions. (Written as an if/else chain, the production bundler
// folded the four imports into one expression and attached only the last version's stylesheet to all of them,
// so V1, V2 and V4 loaded with V3's CSS.)
const versions = {
  old: () => import('./old/entry.jsx'),
  v2: () => import('./v2/entry.jsx'),
  v4: () => import('./v4/entry.jsx'),
  v3: () => import('./entry.jsx'),
}
versions[isOld ? 'old' : isV2 ? 'v2' : isV4 ? 'v4' : 'v3']()
