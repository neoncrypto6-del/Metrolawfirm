import React, { useEffect, useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { GoldDivider } from '../components/GoldDivider';
import { TeamCard } from '../components/TeamCard';
import { supabase } from '../lib/supabase';
import { TeamMember } from '../lib/types';
export function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchTeam() {
      try {
        const { data, error } = await supabase.
        from('teams').
        select('*').
        order('created_at', {
          ascending: true
        });
        if (error) throw error;
        if (data && data.length > 0) {
          setTeam(data);
        } else {
          // Fallback if empty or not connected
          setTeam([
          {
            id: '1',
            name: 'Arthur Pendelton',
            title: 'Managing Partner',
            email: 'arthur@metrolaw.com',
            phone: '(212) 555-0101',
            photo_url:
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
            bio: 'Over 30 years of experience in complex commercial litigation.'
          },
          {
            id: '2',
            name: 'Sarah Jenkins',
            title: 'Senior Partner',
            email: 'sarah@metrolaw.com',
            phone: '(212) 555-0102',
            photo_url:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
            bio: 'Specializes in high-net-worth family law and estate management.'
          },
          {
            id: '3',
            name: 'Dr. Marcus Thorne',
            title: 'Phd. Lawyer',
            email: 'marcus@metrolaw.com',
            phone: '(212) 555-0103',
            photo_url:
            'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800',
            bio: 'Expert in international contract law and corporate structuring.'
          },
          {
            id: '4',
            name: 'Elena Rostova',
            title: 'Associate Attorney',
            email: 'elena@metrolaw.com',
            phone: '(212) 555-0104',
            photo_url:
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
            bio: 'Focuses on debt collection and judgment enforcement.'
          }]
          );
        }
      } catch (err: any) {
        console.error('Error fetching team:', err);
        setError('Could not load team directory. Showing cached profiles.');
        // Fallback
        setTeam([
        {
          id: '1',
          name: 'Arthur Pendelton',
          title: 'Managing Partner',
          email: 'arthur@metrolaw.com',
          phone: '(212) 555-0101',
          photo_url:
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
          bio: 'Over 30 years of experience in complex commercial litigation.'
        }]
        );
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);
  return (
    <PageTransition>
      <div className="pt-32 pb-20 bg-metro-black text-center px-4">
        <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6">
          Our Attorneys
        </h1>
        <p className="text-metro-gold tracking-widest uppercase text-sm font-medium">
          Formidable Legal Minds
        </p>
      </div>

      <GoldDivider />

      <section className="py-24 bg-metro-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error &&
          <div className="mb-8 p-4 bg-metro-black border border-metro-border text-metro-muted text-sm text-center">
              {error}
            </div>
          }

          {loading ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) =>
            <div
              key={i}
              className="aspect-[3/4] bg-metro-black border border-metro-border animate-pulse" />

            )}
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {team.map((member, index) =>
            <TeamCard key={member.id} member={member} index={index} />
            )}
            </div>
          }
        </div>
      </section>
    </PageTransition>);

}