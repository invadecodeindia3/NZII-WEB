const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Extract NewsroomPage and EventsPage
const newsroomRegex = /const NewsroomPage = \(\) => \([\s\S]*?(?=\nconst [A-Za-z]+Page = |\nconst Footer = )/;
const eventsRegex = /const EventsPage = \(\) => \([\s\S]*?(?=\nconst [A-Za-z]+Page = |\nconst Footer = )/;

const newsroomMatch = code.match(newsroomRegex);
const eventsMatch = code.match(eventsRegex);

if (!newsroomMatch || !eventsMatch) {
  console.log("Could not find components");
  process.exit(1);
}

const newsroomCode = newsroomMatch[0];
const eventsCode = eventsMatch[0];

// 2. Extract individual sections
function getSection(compCode, sectionMarker) {
  // e.g. sectionMarker = "N1"
  // Find `{/* N1: ... */}`
  const regex = new RegExp(`\\{\\/\\* ${sectionMarker}:[\\s\\S]*?(?=\\{\\/\\* [EN][1-4]:|\\<\\/div\\>\\n\\);)`);
  const match = compCode.match(regex);
  return match ? match[0].trim() : '';
}

const N1 = getSection(newsroomCode, 'N1');
const N2 = getSection(newsroomCode, 'N2');
const N3 = getSection(newsroomCode, 'N3');
const N4 = getSection(newsroomCode, 'N4');

const E1 = getSection(eventsCode, 'E1');
const E2 = getSection(eventsCode, 'E2');
const E3 = getSection(eventsCode, 'E3');

// 3. Create UpdatesPage
const updatesPageCode = `const UpdatesPage = () => (
  <div className="w-full animate-fade-up">
    ${E1}
    
    ${N1}
    
    ${E2}
    
    ${N2}
    
    ${N3}
    
    ${E3}
    
    ${N4}
  </div>
);`;

// 4. Replace in code
code = code.replace(newsroomMatch[0], '');
code = code.replace(eventsMatch[0], updatesPageCode);

// 5. Update navLinks
code = code.replace(
  "{ id: 'events', label: 'Events' },\n    { id: 'newsroom', label: 'Newsroom' }",
  "{ id: 'updates', label: 'Updates & Engagements' }"
);

// 6. Update rendering
code = code.replace(
  "{currentPage === 'events' && <EventsPage />}\n          {currentPage === 'newsroom' && <NewsroomPage />}",
  "{currentPage === 'updates' && <UpdatesPage />}"
);

fs.writeFileSync('src/App.jsx', code);
console.log("Successfully combined into UpdatesPage");
