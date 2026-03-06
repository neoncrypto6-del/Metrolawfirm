import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { GoldDivider } from '../components/GoldDivider';
import { ServiceCard } from '../components/ServiceCard';
import { TeamCard } from '../components/TeamCard';
import { servicesData } from '../lib/services-data';
import { supabase } from '../lib/supabase';
import { TeamMember } from '../lib/types';
export function HomePage() {
  const [teamPreview, setTeamPreview] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  useEffect(() => {
    async function fetchTeam() {
      try {
        const { data, error } = await supabase.
        from('teams').
        select('*').
        limit(4);
        if (error) throw error;
        if (data) setTeamPreview(data);
      } catch (err) {
        console.error('Error fetching team preview:', err);
        // Fallback dummy data if supabase isn't configured yet
        setTeamPreview([
        {
          id: '1',
          name: 'Arthur Pendelton',
          title: 'Managing Partner',
          email: 'arthur@metrolaw.com',
          phone: null,
          photo_url:
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
          bio: 'Over 30 years of experience in complex commercial litigation.'
        },
        {
          id: '2',
          name: 'Sarah Jenkins',
          title: 'Senior Partner',
          email: 'sarah@metrolaw.com',
          phone: null,
          photo_url:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
          bio: 'Specializes in high-net-worth family law and estate management.'
        }]
        );
      } finally {
        setLoadingTeam(false);
      }
    }
    fetchTeam();
  }, []);
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/MetroIMG2.png"
            alt="Metro Law Firm Team"
            className="w-full h-full object-cover object-top" />

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-metro-black/60" />
        </div>

        {/* Abstract dark background pattern layered on top */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-metro-black to-metro-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 1,
              ease: 'easeOut'
            }}>

            <h2 className="text-metro-gold tracking-[0.2em] uppercase text-sm md:text-base font-medium mb-6 drop-shadow-md">
              Excellence in Legal Advocacy
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair text-white mb-8 leading-tight text-glow">
              Justice. <br className="md:hidden" />
              Integrity. <br className="md:hidden" />
              Results.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 font-light drop-shadow-md">
              Metro Law Firm provides uncompromising representation for
              individuals and businesses navigating high-stakes legal
              challenges.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-metro-gold text-metro-black font-medium tracking-wider uppercase hover:bg-metro-gold-hover transition-colors">

                Request Consultation
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto px-8 py-4 border border-metro-gold text-white hover:bg-metro-black/50 transition-colors font-medium tracking-wider uppercase backdrop-blur-sm">

                Our Firm
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <GoldDivider />

      {/* Services Section */}
      <section className="py-24 bg-metro-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair text-white mb-6">
              Practice Areas
            </h2>
            <p className="text-metro-muted max-w-2xl mx-auto">
              Focused expertise across critical legal domains. We deliver
              strategic counsel and aggressive litigation to protect your
              interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) =>
            <ServiceCard key={service.slug} {...service} index={index} />
            )}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Team Preview Section */}
      <section className="py-24 bg-metro-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-playfair text-white mb-6">
                Our Attorneys
              </h2>
              <p className="text-metro-muted max-w-2xl">
                A formidable team of legal minds dedicated to achieving
                exceptional outcomes for our clients.
              </p>
            </div>
            <Link
              to="/team"
              className="flex items-center text-metro-gold tracking-wider uppercase text-sm font-medium hover:text-white transition-colors">

              View Full Team <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {loadingTeam ?
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) =>
            <div
              key={i}
              className="aspect-[3/4] bg-metro-border animate-pulse" />

            )}
            </div> :

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamPreview.map((member, index) =>
            <TeamCard key={member.id} member={member} index={index} />
            )}
            </div>
          }
        </div>
      </section>

      <GoldDivider />

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-metro-black" />
        <div className="absolute inset-0 bg-[url('https://cdn.magicpatterns.com/uploads/inuSECkAP56UiALjBPUjqp/MetroIMG1.png')] bg-cover bg-center opacity-20 mix-blend-luminosity" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-playfair text-white mb-8">
            Protect Your Rights. <br className="hidden md:block" />
            <span className="text-metro-gold italic">Secure Your Future.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light drop-shadow-md">
            Time is often critical in legal matters. Contact Metro Law Firm
            today to schedule a confidential consultation with our legal team.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-5 bg-metro-gold text-metro-black font-medium tracking-widest uppercase hover:bg-white transition-colors shadow-lg">

            Contact Us Now
          </Link>
        </div>
      </section>
    </PageTransition>);

}