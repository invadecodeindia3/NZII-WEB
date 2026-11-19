import { useCallback, useEffect, useState } from 'react';

const words = (t) => (t.value.trim().match(/\S+/g) || []).length;

/**
 * The Open Calls microsite is one route with several views chosen by the address:
 * #home, #themes, #theme-…, #apply, #faqs, #eoi and #sent. This hook picks the view, keeps the tab title in
 * step, counts words in the form's long answers and checks the form on submit (prototype: no data is sent).
 */
export const useOpenCallsSite = (rootRef) => {
  const [hash, setHash] = useState(() => window.location.hash);
  const [view, setView] = useState('home');

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const h = hash.slice(1) || 'home';
    const el = root.querySelector('#' + CSS.escape(h));
    const pg = el && el.classList.contains('page') ? h : 'home';
    setView(pg);
    const title = root.querySelector('#' + CSS.escape(pg) + ' h1');
    document.title = (title ? title.textContent + ' | ' : '') + 'Collaborate with us | Net Zero India Initiative';
    window.scrollTo(0, 0);
  }, [hash, rootRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    // "Express interest" on a theme page preselects that theme in the form
    const onClick = (e) => {
      const a = e.target.closest('a[data-theme]');
      const select = root.querySelector('#f-theme');
      if (a && select) select.value = a.dataset.theme;
    };
    const onInput = (e) => {
      const t = e.target;
      if (!t.matches || !t.matches('textarea[data-words]')) return;
      const out = t.parentNode.querySelector('.wc');
      const n = words(t);
      const max = +t.dataset.words;
      out.textContent = n + ' / ' + max + ' words';
      out.classList.toggle('over', n > max);
    };
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.querySelectorAll('textarea[data-words]').forEach((t) => onInput({ target: t }));
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('input', onInput);
    };
  }, [rootRef]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      const bad = [];
      f.querySelectorAll('.field').forEach((fd) => fd.classList.remove('invalid'));
      f.querySelectorAll('[required]').forEach((el) => {
        const ok =
          el.type === 'radio'
            ? !!f.querySelector('input[name="' + el.name + '"]:checked')
            : el.type === 'checkbox'
              ? el.checked
              : el.checkValidity() && el.value.trim() !== '';
        if (!ok) {
          const fd = el.closest('.field');
          if (fd && !bad.includes(fd)) {
            fd.classList.add('invalid');
            bad.push(fd);
          }
        }
      });
      f.querySelectorAll('textarea[data-words]').forEach((t) => {
        if (words(t) > +t.dataset.words) {
          const fd = t.closest('.field');
          fd.classList.add('invalid');
          if (!bad.includes(fd)) bad.push(fd);
        }
      });
      const err = f.querySelector('#eoi-err');
      if (err) err.hidden = !bad.length;
      if (bad.length) {
        const first = bad[0].querySelector('input,textarea,select');
        if (first) first.focus();
        return;
      }
      f.reset();
      f.querySelectorAll('textarea[data-words]').forEach((t) => t.dispatchEvent(new Event('input', { bubbles: true })));
      window.location.hash = 'sent';
    },
    [],
  );

  return { view, onSubmit };
};
