import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Site-wide disclosure until each dataset and institutional assertion is validated.
export function DataStatusNotice() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <aside role="status" className="fixed bottom-[72px] sm:bottom-[84px] left-4 right-4 sm:left-auto sm:w-[360px] z-[70] p-4 rounded-xl border border-amber-400/50 bg-[#131B25] shadow-2xl text-xs text-white leading-relaxed">
      <button type="button" className="float-right ml-2 underline" onClick={() => setVisible(false)}>Dismiss</button>
      <strong className="block mb-1 text-amber-300">Research prototype — data verification pending</strong>
      Figures, simulations, case studies, memberships and affiliations may be illustrative. There is no live national inventory or institutional audit connected to this version.
      {' '}<Link className="underline text-amber-200" to="/data">Explore data status</Link>
    </aside>
  );
}
