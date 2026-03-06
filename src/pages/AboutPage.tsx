import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { GoldDivider } from '../components/GoldDivider';
import { ShieldIcon, TargetIcon, AwardIcon, UsersIcon } from 'lucide-react';
export function AboutPage() {
  const values = [
  {
    icon: ShieldIcon,
    title: 'Integrity',
    desc: 'Unwavering ethical standards in every action, negotiation, and courtroom appearance.'
  },
  {
    icon: AwardIcon,
    title: 'Excellence',
    desc: 'A commitment to meticulous preparation and superior legal craftsmanship.'
  },
  {
    icon: TargetIcon,
    title: 'Advocacy',
    desc: 'Fierce, strategic representation designed to achieve the best possible outcomes.'
  },
  {
    icon: UsersIcon,
    title: 'Client-First',
    desc: 'Transparent communication and personalized strategies tailored to your unique goals.'
  }];

  return (
    <PageTransition>
      <div className="pt-32 pb-20 bg-metro-black text-center px-4">
        <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6">
          About the Firm
        </h1>
        <p className="text-metro-gold tracking-widest uppercase text-sm font-medium">
          A Legacy of Legal Excellence
        </p>
      </div>

      <GoldDivider />

      <section className="py-24 bg-metro-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.8
              }}>

              <h2 className="text-3xl md:text-4xl font-playfair text-white mb-6">
                Our Mission
              </h2>
              <div className="w-20 h-1 bg-metro-gold mb-8" />
              <p className="text-metro-body text-lg leading-relaxed mb-6">
                Founded on the principles of rigorous advocacy and
                uncompromising integrity, Metro Law Firm has established itself
                as a premier destination for complex legal disputes. We do not
                simply process cases; we engineer legal victories.
              </p>
              <p className="text-metro-body text-lg leading-relaxed">
                Whether representing a multinational corporation in a
                high-stakes breach of contract, or an individual navigating a
                contentious divorce, our approach remains consistent: meticulous
                preparation, aggressive representation, and a relentless focus
                on our clients' objectives.
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.8
              }}
              className="relative aspect-square lg:aspect-[4/3]">

              <div className="absolute inset-0 border-2 border-metro-gold translate-x-4 translate-y-4 z-0" />
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1200"
                alt="Law library"
                className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />

            </motion.div>
          </div>
        </div>
      </section>

      <GoldDivider />

      <section className="py-24 bg-metro-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair text-white mb-6">
              Core Values
            </h2>
            <p className="text-metro-muted max-w-2xl mx-auto">
              The foundational principles that guide our practice and define our
              relationships with clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) =>
            <motion.div
              key={val.title}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1
              }}
              className="bg-metro-surface p-8 border border-metro-border text-center hover:border-metro-gold transition-colors">

                <val.icon className="w-12 h-12 text-metro-gold mx-auto mb-6" />
                <h3 className="text-xl font-playfair text-white mb-4">
                  {val.title}
                </h3>
                <p className="text-metro-muted text-sm leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>);

}