import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { TeamMember } from '../lib/types';
interface TeamCardProps {
  member: TeamMember;
  index: number;
}
export function TeamCard({ member, index }: TeamCardProps) {
  return (
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
        once: true,
        margin: '-50px'
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1
      }}
      className="group h-full">

      <Link to={`/team/${member.id}`} className="block h-full">
        <div className="bg-metro-surface border border-metro-border overflow-hidden hover:border-metro-gold transition-all duration-500 border-glow h-full flex flex-col">
          <div className="aspect-[3/4] overflow-hidden relative bg-metro-black">
            {member.photo_url ?
            <img
              src={member.photo_url}
              alt={member.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" /> :


            <div className="w-full h-full flex items-center justify-center text-metro-border group-hover:text-metro-muted transition-colors">
                <span className="font-playfair text-6xl opacity-20">
                  {member.name.charAt(0)}
                </span>
              </div>
            }
            <div className="absolute inset-0 bg-gradient-to-t from-metro-black via-transparent to-transparent opacity-80" />
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-2xl font-playfair text-white mb-1 group-hover:text-metro-gold transition-colors">
              {member.name}
            </h3>
            <p className="text-metro-gold text-sm tracking-wider uppercase mb-4">
              {member.title}
            </p>

            {member.bio &&
            <p className="text-metro-muted text-sm line-clamp-3 mb-6 flex-1">
                {member.bio}
              </p>
            }

            <div className="space-y-2 mt-auto pt-4 border-t border-metro-border">
              {member.email &&
              <div className="flex items-center gap-3 text-sm text-metro-muted">
                  <MailIcon className="w-4 h-4 text-metro-gold" />
                  {member.email}
                </div>
              }
              {member.phone &&
              <div className="flex items-center gap-3 text-sm text-metro-muted">
                  <PhoneIcon className="w-4 h-4 text-metro-gold" />
                  {member.phone}
                </div>
              }
            </div>
          </div>
        </div>
      </Link>
    </motion.div>);

}