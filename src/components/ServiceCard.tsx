import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
interface ServiceCardProps {
  slug: string;
  title: string;
  shortDescription: string;
  iconName: string;
  imageUrl: string;
  index: number;
}
export function ServiceCard({
  slug,
  title,
  shortDescription,
  iconName,
  imageUrl,
  index
}: ServiceCardProps) {
  // Dynamically get the icon component from lucide-react
  const IconComponent = (Icons as any)[iconName] || Icons.ScaleIcon;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-50px'
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      className="h-full">

      <Link
        to={`/services/${slug}`}
        className="block h-full bg-metro-surface border border-metro-border group hover:border-metro-gold transition-all duration-500 border-glow relative overflow-hidden flex flex-col">

        {/* Image Header */}
        <div className="h-[200px] relative overflow-hidden bg-metro-black flex-shrink-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />

          <div className="absolute inset-0 bg-gradient-to-t from-metro-surface via-metro-black/40 to-transparent opacity-90" />

          {/* Icon overlaid on image */}
          <div className="absolute bottom-4 left-6 w-12 h-12 bg-metro-black border border-metro-border flex items-center justify-center group-hover:border-metro-gold transition-colors duration-500 z-10">
            <IconComponent className="w-5 h-5 text-metro-gold" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10 flex-1 flex flex-col">
          {/* Subtle hover gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-metro-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <h3 className="text-xl font-playfair text-white mb-3 group-hover:text-metro-gold transition-colors duration-300">
            {title}
          </h3>

          <p className="text-metro-muted text-sm leading-relaxed mb-6 flex-1">
            {shortDescription}
          </p>

          <div className="flex items-center text-metro-gold text-sm font-medium tracking-wider uppercase group-hover:translate-x-2 transition-transform duration-300 mt-auto">
            Learn More <Icons.ArrowRightIcon className="w-4 h-4 ml-2" />
          </div>
        </div>
      </Link>
    </motion.div>);

}