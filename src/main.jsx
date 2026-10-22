// Chooses which version of the site to boot at load time.
// "/old" and "/old/*"  → archived V1 site
// "/v2"  and "/v2/*"   → archived V2 site
// everything else      → current V3 site
// Dynamic imports keep each version's global stylesheet isolated
// (switching versions is always a full page load via VersionToggle).
const { pathname } = window.location
const isOld = pathname === '/old' || pathname.startsWith('/old/')
const isV2  = pathname === '/v2'  || pathname.startsWith('/v2/')

if (isOld) {
  import('./old/entry.jsx')
} else if (isV2) {
  import('./v2/entry.jsx')
} else {
  import('./entry.jsx')
}
