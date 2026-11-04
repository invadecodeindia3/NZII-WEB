import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="ft-top">
        <div className="ft-brand">
          <Link to="/" style={{ display: 'inline-flex' }} aria-label="Net Zero India Initiative homepage">
            <img
              className="logo-l"
              alt="Net Zero India Initiative"
              src="/assets/logos/nzii-logo-colour.svg"
              width="1497"
              height="692"
              loading="lazy"
            />
            <img
              className="logo-d"
              alt="Net Zero India Initiative"
              src="/assets/logos/nzii-logo-pale-yellow.svg"
              width="1497"
              height="692"
              loading="lazy"
            />
          </Link>
          <p>
            The Net Zero India Initiative brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the&nbsp;environment.
          </p>
        </div>
        <nav className="ft-nav" aria-label="Footer navigation">
          <Link to="/about">About NZII</Link>
          <Link to="/consortium">People &amp; Partners</Link>
        </nav>
      </div>
      <div className="ft-bottom">
        <span>Net Zero India Initiative · Research, pathways and evidence</span>
        <span>Made for curiosity, grounded in evidence.</span>
      </div>
    </footer>
  );
};
