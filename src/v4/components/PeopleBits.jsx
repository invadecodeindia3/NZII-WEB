import React from 'react';
import { personId } from '../data/people';

const ScholarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 1 9l11 6 9-4.91V16h2V9L12 3z" />
    <path d="M5 13.18v3.6L12 21l7-4.22v-3.6L12 17l-7-3.82z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V21h-4V9.5z" />
  </svg>
);

/** Google Scholar and LinkedIn icon links for one person; renders nothing when they have neither. */
export const ProfileLinks = ({ person }) => {
  if (!person.scholar && !person.linkedin) return null;
  return (
    <span className="plinks">
      {person.scholar && (
        <a className="plk" href={person.scholar} target="_blank" rel="noopener" aria-label={`${person.name} on Google Scholar (opens in a new tab)`} title="Google Scholar">
          <ScholarIcon />
        </a>
      )}
      {person.linkedin && (
        <a className="plk" href={person.linkedin} target="_blank" rel="noopener" aria-label={`${person.name} on LinkedIn (opens in a new tab)`} title="LinkedIn">
          <LinkedInIcon />
        </a>
      )}
    </span>
  );
};

/** One row in a team list: initials, name, role and profile links. */
export const TeamMember = ({ person, anchor = true }) => {
  const cls = [person.lead && 'is-lead', !person.role && 'no-role'].filter(Boolean).join(' ') || undefined;
  return (
    <li className={cls} id={anchor && !person.alsoPi ? personId(person.name) : undefined}>
      <span className="av" aria-hidden="true">{person.initials}</span>
      <b>{person.name}</b>
      {person.role && <span className="role">{person.role}</span>}
      <ProfileLinks person={person} />
    </li>
  );
};
