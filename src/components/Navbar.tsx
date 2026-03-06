import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, ChevronDownIcon } from 'lucide-react';
import { servicesData } from '../lib/services-data';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);
  const navLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Our Team',
    path: '/team'
  },
  {
    name: 'Contact',
    path: '/contact'
  }];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-metro-black/95 backdrop-blur-md border-b border-metro-border py-4' : 'bg-transparent py-6'}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <img
              src="/Metro_logo.png"
              alt="Metro Law Logo"
              className="h-10 w-auto object-contain" />

            <span className="font-playfair text-2xl font-bold tracking-widest text-white uppercase hidden sm:block">
              Metro <span className="text-metro-gold">Law</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm tracking-wider uppercase font-medium transition-colors duration-300 relative group ${location.pathname === link.path ? 'text-metro-gold' : 'text-gray-300 hover:text-white'}`}>

                {link.name}
                <span
                className={`absolute -bottom-1 left-0 w-full h-[1px] bg-metro-gold transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />

              </Link>
            )}

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}>

              <button
                className={`flex items-center gap-1 text-sm tracking-wider uppercase font-medium transition-colors duration-300 ${location.pathname.includes('/services') ? 'text-metro-gold' : 'text-gray-300 hover:text-white'}`}>

                Practice Areas
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180 text-metro-gold' : ''}`} />

              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full right-0 mt-4 w-72 bg-metro-surface border border-metro-border shadow-2xl transition-all duration-300 transform origin-top ${servicesDropdownOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}>

                <div className="py-2">
                  {servicesData.map((service) =>
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="block px-6 py-3 text-sm text-gray-300 hover:text-metro-gold hover:bg-metro-black transition-colors duration-200">

                      {service.title}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="ml-4 px-6 py-2 border border-metro-gold text-metro-gold hover:bg-metro-gold hover:text-metro-black transition-all duration-300 text-sm tracking-wider uppercase font-medium border-glow">

              Consultation
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

            {mobileMenuOpen ?
            <XIcon className="w-6 h-6" /> :

            <MenuIcon className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-metro-surface border-b border-metro-border transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>

        <div className="flex flex-col px-4 space-y-4">
          {navLinks.map((link) =>
          <Link
            key={link.name}
            to={link.path}
            className={`text-lg font-playfair ${location.pathname === link.path ? 'text-metro-gold' : 'text-gray-300'}`}>

              {link.name}
            </Link>
          )}
          <div className="pt-4 border-t border-metro-border">
            <span className="text-sm tracking-wider uppercase text-metro-muted mb-4 block">
              Practice Areas
            </span>
            <div className="flex flex-col space-y-3 pl-4 border-l border-metro-border">
              {servicesData.map((service) =>
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="text-gray-300 hover:text-metro-gold transition-colors">

                  {service.title}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>);

}