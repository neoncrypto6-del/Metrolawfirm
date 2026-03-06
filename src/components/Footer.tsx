import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';
import { servicesData } from '../lib/services-data';
export function Footer() {
  return (
    <footer className="bg-metro-surface border-t border-metro-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="/Metro_logo.png"
                alt="Metro Law Logo"
                className="h-8 w-auto object-contain" />

              <span className="font-playfair text-xl font-bold tracking-widest text-white uppercase">
                Metro <span className="text-metro-gold">Law</span>
              </span>
            </Link>
            <p className="text-metro-muted text-sm leading-relaxed mb-6">
              Prestigious legal representation delivering uncompromising results
              for businesses and individuals facing complex legal challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-white text-lg mb-6 tracking-wide">
              Firm
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-metro-muted hover:text-metro-gold transition-colors text-sm">

                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-metro-muted hover:text-metro-gold transition-colors text-sm">

                  Our Attorneys
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-metro-muted hover:text-metro-gold transition-colors text-sm">

                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-playfair text-white text-lg mb-6 tracking-wide">
              Practice Areas
            </h4>
            <ul className="space-y-3">
              {servicesData.slice(0, 5).map((service) =>
              <li key={service.slug}>
                  <Link
                  to={`/services/${service.slug}`}
                  className="text-metro-muted hover:text-metro-gold transition-colors text-sm">

                    {service.title}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-white text-lg mb-6 tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-metro-gold flex-shrink-0 mt-0.5" />
                <span className="text-metro-muted text-sm">
                  100 Prestige Tower, Suite 4500
                  <br />
                  New York, NY 10005
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-metro-gold flex-shrink-0" />
                <span className="text-metro-muted text-sm">
                  +1 (212) 555-0198
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-metro-gold flex-shrink-0" />
                <span className="text-metro-muted text-sm">
                  counsel@metrolaw.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-metro-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-metro-muted text-xs">
            &copy; {new Date().getFullYear()} Metro Law Firm. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/admin"
              className="text-metro-muted hover:text-metro-gold text-xs transition-colors">

              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}