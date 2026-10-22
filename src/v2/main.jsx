// Chooses which version of the site to boot at load time.
// "/old" and "/old/*" load the archived Old site; everything else loads the
// current site. Dynamic imports keep each version's global stylesheet isolated
// (switching versions is always a full page load via VersionToggle).
const { pathname } = window.location
const isOld = pathname === '/old' || pathname.startsWith('/old/')

if (isOld) {
  import('./old/entry.jsx')
} else {
  import('./entry.jsx')
}
