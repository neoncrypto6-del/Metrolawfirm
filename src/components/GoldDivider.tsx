import React from 'react';
import { motion } from 'framer-motion';
interface GoldDividerProps {
  className?: string;
  animate?: boolean;
}
export function GoldDivider({
  className = '',
  animate = true
}: GoldDividerProps) {
  if (!animate) {
    return (
      <div
        className={`h-[1px] bg-gradient-to-r from-transparent via-metro-gold to-transparent opacity-50 ${className}`} />);


  }
  return (
    <motion.div
      initial={{
        scaleX: 0,
        opacity: 0
      }}
      whileInView={{
        scaleX: 1,
        opacity: 0.5
      }}
      viewport={{
        once: true,
        margin: '-100px'
      }}
      transition={{
        duration: 1,
        ease: 'easeOut'
      }}
      className={`h-[1px] bg-gradient-to-r from-transparent via-metro-gold to-transparent origin-center ${className}`} />);


}