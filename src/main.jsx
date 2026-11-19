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

if (isOld) {
  import('./old/entry.jsx')
} else if (isV2) {
  import('./v2/entry.jsx')
} else if (isV4) {
  import('./v4/entry.jsx')
} else {
  import('./entry.jsx')
}
