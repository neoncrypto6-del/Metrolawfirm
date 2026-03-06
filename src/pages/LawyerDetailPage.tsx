import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { GoldDivider } from '../components/GoldDivider';
import { supabase } from '../lib/supabase';
import { TeamMember } from '../lib/types';
export function LawyerDetailPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchLawyer() {
      if (!id) return;
      try {
        const { data, error } = await supabase.
        from('teams').
        select('*').
        eq('id', id).
        single();
        if (error) throw error;
        if (data) {
          setLawyer(data);
        } else {
          setError('Lawyer not found.');
        }
      } catch (err: any) {
        console.error('Error fetching lawyer:', err);
        setError('Could not load profile details.');
      } finally {
        setLoading(false);
      }
    }
    fetchLawyer();
    window.scrollTo(0, 0);
  }, [id]);
  if (loading) {
    return (
      <PageTransition className="min-h-screen bg-metro-black pt-32 pb-20 px-4 flex justify-center">
        <div className="w-full max-w-5xl animate-pulse">
          <div className="h-8 bg-metro-border w-1/4 mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="aspect-[3/4] bg-metro-border"></div>
            <div className="md:col-span-2 space-y-6">
              <div className="h-12 bg-metro-border w-2/3"></div>
              <div className="h-6 bg-metro-border w-1/3"></div>
              <div className="h-32 bg-metro-border w-full mt-8"></div>
            </div>
          </div>
        </div>
      </PageTransition>);

  }
  if (error || !lawyer) {
    return (
      <PageTransition className="min-h-screen bg-metro-black pt-40 pb-20 px-4 text-center">
        <h1 className="text-4xl font-playfair text-white mb-6">
          Profile Not Found
        </h1>
        <p className="text-metro-muted mb-8">
          {error || "The attorney profile you're looking for doesn't exist."}
        </p>
        <Link
          to="/team"
          className="inline-flex items-center text-metro-gold hover:text-white transition-colors uppercase tracking-wider text-sm font-medium">

          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Return to Directory
        </Link>
      </PageTransition>);

  }
  return (
    <PageTransition>
      <div className="pt-32 pb-12 bg-metro-black px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/team"
            className="inline-flex items-center text-metro-muted hover:text-metro-gold transition-colors uppercase tracking-wider text-xs font-medium mb-12">

            <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Team
          </Link>
        </div>
      </div>

      <section className="pb-24 bg-metro-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Photo Column */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6
              }}
              className="lg:col-span-4">

              <div className="aspect-[3/4] bg-metro-surface border border-metro-border overflow-hidden relative">
                {lawyer.photo_url ?
                <img
                  src={lawyer.photo_url}
                  alt={lawyer.name}
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700" /> :


                <div className="w-full h-full flex items-center justify-center text-metro-border">
                    <span className="font-playfair text-8xl opacity-20">
                      {lawyer.name.charAt(0)}
                    </span>
                  </div>
                }
                <div className="absolute inset-0 bg-gradient-to-t from-metro-black via-transparent to-transparent opacity-60" />
              </div>
            </motion.div>

            {/* Details Column */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.2
              }}
              className="lg:col-span-8">

              <h1 className="text-4xl md:text-6xl font-playfair text-white mb-2">
                {lawyer.name}
              </h1>
              <p className="text-xl text-metro-gold tracking-widest uppercase mb-8">
                {lawyer.title}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-12 pb-8 border-b border-metro-border">
                {lawyer.email &&
                <a
                  href={`mailto:${lawyer.email}`}
                  className="flex items-center gap-3 text-metro-body hover:text-white transition-colors">

                    <div className="w-10 h-10 border border-metro-border flex items-center justify-center bg-metro-surface">
                      <MailIcon className="w-4 h-4 text-metro-gold" />
                    </div>
                    {lawyer.email}
                  </a>
                }
                {lawyer.phone &&
                <a
                  href={`tel:${lawyer.phone}`}
                  className="flex items-center gap-3 text-metro-body hover:text-white transition-colors">

                    <div className="w-10 h-10 border border-metro-border flex items-center justify-center bg-metro-surface">
                      <PhoneIcon className="w-4 h-4 text-metro-gold" />
                    </div>
                    {lawyer.phone}
                  </a>
                }
              </div>

              <div className="prose prose-invert prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-playfair text-white mb-6">
                  Biography
                </h2>
                {lawyer.bio ?
                <div className="text-metro-body leading-relaxed whitespace-pre-line">
                    {lawyer.bio}
                  </div> :

                <p className="text-metro-muted italic">
                    No biography available.
                  </p>
                }
              </div>

              <div className="pt-8 border-t border-metro-border">
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 bg-metro-gold text-metro-black font-medium tracking-wider uppercase hover:bg-metro-gold-hover transition-colors">

                  Request Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <GoldDivider />
    </PageTransition>);

}