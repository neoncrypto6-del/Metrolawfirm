import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2Icon, ArrowRightIcon } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { GoldDivider } from '../components/GoldDivider';
import { servicesData } from '../lib/services-data';
export function ServicePage() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const navigate = useNavigate();
  const service = servicesData.find((s) => s.slug === slug);
  useEffect(() => {
    if (!service) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [service, navigate]);
  if (!service) return null;
  return (
    <PageTransition>
      {/* Hero */}
      <div className="pt-40 pb-24 bg-metro-black text-center px-4 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover object-center" />

          <div className="absolute inset-0 bg-metro-black/60" />
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-metro-surface/50 via-metro-black/80 to-metro-black opacity-80" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-metro-gold tracking-widest uppercase text-sm font-medium mb-6 drop-shadow-md">
            Practice Area
          </p>
          <h1 className="text-4xl md:text-6xl font-playfair text-white mb-8 leading-tight text-glow">
            {service.title}
          </h1>
          <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto drop-shadow-md">
            {service.shortDescription}
          </p>
        </div>
      </div>

      <GoldDivider />

      <section className="py-24 bg-metro-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-playfair text-white mb-6">
                  Legal Overview
                </h2>
                <div className="space-y-6 text-metro-body leading-relaxed text-lg">
                  {service.fullDescription.map((paragraph, idx) =>
                  <p key={idx}>{paragraph}</p>
                  )}
                </div>
              </div>

              <GoldDivider animate={false} />

              <div>
                <h2 className="text-3xl font-playfair text-white mb-8">
                  Our Process
                </h2>
                <div className="space-y-8">
                  {service.processSteps.map((step, idx) =>
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: idx * 0.1
                    }}
                    className="flex gap-6">

                      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-metro-gold flex items-center justify-center text-metro-gold font-playfair text-xl">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-playfair text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-metro-muted">{step.description}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-metro-black border border-metro-border p-8 sticky top-32">
                <h3 className="text-2xl font-playfair text-white mb-6">
                  Key Capabilities
                </h3>
                <ul className="space-y-4 mb-10">
                  {service.keyPoints.map((point, idx) =>
                  <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2Icon className="w-5 h-5 text-metro-gold flex-shrink-0 mt-0.5" />
                      <span className="text-metro-muted text-sm leading-relaxed">
                        {point}
                      </span>
                    </li>
                  )}
                </ul>

                <div className="pt-8 border-t border-metro-border">
                  <h4 className="text-white font-medium mb-4">
                    Need Legal Assistance?
                  </h4>
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center gap-2 bg-metro-gold text-metro-black py-4 font-medium tracking-wider uppercase hover:bg-metro-gold-hover transition-colors text-sm">

                    {service.ctaText} <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>);

}