/**
 * V4 placeholder page used for Research, Publications and Contact, exactly as in the NZII Version 2 prototype
 * (NZII_Research_Page.html and friends): the copy for these pages has not been written yet.
 */
import React, { useRef } from 'react';
import { usePageTitle, usePrototypeBehaviours } from '../hooks/usePrototypeBehaviours';
import { useDraftMotion } from '../hooks/pageMotions';
import '../styles/draft.css';

export const DraftPage = ({ name }) => {
  const root = useRef(null);
  usePrototypeBehaviours(root);
  useDraftMotion(root);
  usePageTitle(`${name} (draft) | Net Zero India Initiative`);
  return (
    <main id="content" ref={root}>
        <div className="container page">
          <section className="hero" id="overview">
            <div className="hero-text">
              <span className="label">Draft</span>
              <h1>{name}</h1>
              <hr className="rule" />
              <p className="lead">This page is in progress. Content to follow.</p>
            </div>
          </section>
        </div>
    </main>
  );
};
