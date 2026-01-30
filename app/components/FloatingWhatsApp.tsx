'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const WHATSAPP_NUMBER = '6281234567890'; // Update dengan nomor WhatsApp Anda
const WHATSAPP_MESSAGE = 'Halo, saya ingin konsultasi gratis tentang layanan kecantikan di Klinik Pratama DRW Estetika.';

const breathingAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

const pulseRing = {
  scale: [1, 1.2],
  opacity: [0.8, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeOut',
  },
};

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-8 right-8 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulse Ring Background */}
      <motion.div
        variants={pulseRing}
        className="absolute inset-0 bg-green-500 rounded-full"
        style={{ width: 56, height: 56 }}
      />

      {/* Main Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        variants={breathingAnimation}
        animate="scale"
        className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group"
      >
        {/* WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.192-1.048 1.007-1.954 2.14-2.573 3.472-.619 1.331-.945 2.851-.945 4.465 0 1.614.326 3.134.945 4.465 1.048 2.007 2.573 3.806 4.255 5.063 1.682 1.257 3.587 2.007 5.421 2.007 1.614 0 3.134-.326 4.465-.945 2.007-1.048 3.806-2.573 5.063-4.255 1.257-1.682 2.007-3.587 2.007-5.421 0-1.614-.326-3.134-.945-4.465-1.048-2.007-2.573-3.806-4.255-5.063-1.682-1.257-3.587-2.007-5.421-2.007z" />
        </svg>
      </motion.a>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
        transition={{ duration: 0.2 }}
        className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium pointer-events-none shadow-lg"
      >
        Konsultasi Gratis via WA
        {/* Tooltip Arrow */}
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
      </motion.div>
    </motion.div>
  );
}
