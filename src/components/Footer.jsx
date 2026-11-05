import React from 'react';
import { Link } from 'react-router-dom';
import { useSanity } from '../sanity/useSanity';
import { siteSettingsQuery } from '../sanity/queries';

export const Footer = () => {
  const { data: settings } = useSanity(siteSettingsQuery);

  return (
    <footer className="site-footer">
      <div className="ft-top">
        <div className="ft-brand">
          <Link to="/" style={{ display: 'inline-flex' }} aria-label={settings?.title ? `${settings.title} homepage` : "Net Zero India Initiative homepage"}>
            <img
              className="logo-l"
              alt={settings?.title || "Net Zero India Initiative"}
              src={settings?.logoLight || "/assets/logos/nzii-logo-colour.svg"}
              width="1497"
              height="692"
              loading="lazy"
            />
            <img
              className="logo-d"
              alt={settings?.title || "Net Zero India Initiative"}
              src={settings?.logoDark || "/assets/logos/nzii-logo-pale-yellow.svg"}
              width="1497"
              height="692"
              loading="lazy"
            />
          </Link>
          <p>
            {settings?.footerText || "The Net Zero India Initiative brings together research, modelling and diverse expertise to understand the pathways India could take, and their implications for development, people and the\u00A0environment."}
          </p>
        </div>
        <nav className="ft-nav" aria-label="Footer navigation">
          <Link to="/about">About NZII</Link>
          <Link to="/consortium">People &amp; Partners</Link>
        </nav>
      </div>
      <div className="ft-bottom">
        <span>{settings?.footerTagline1 || "Net Zero India Initiative · Research, pathways and evidence"}</span>
        <span>{settings?.footerTagline2 || "Made for curiosity, grounded in evidence."}</span>
      </div>
    </footer>
  );
};
