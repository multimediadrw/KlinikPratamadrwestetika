'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
} as const;

export default function PremiumFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Layanan',
      links: [
        { name: 'Facial Treatment', href: '/layanan#facial' },
        { name: 'Advanced Treatment', href: '/layanan#advanced' },
        { name: 'Injection Therapy', href: '/layanan#injection' },
        { name: 'Chemical Peeling', href: '/layanan#peeling' },
      ],
    },
    {
      title: 'Informasi',
      links: [
        { name: 'Tentang Kami', href: '/tentang' },
        { name: 'Galeri', href: '/galeri' },
        { name: 'Harga', href: '/harga' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Kontak',
      links: [
        { name: 'WhatsApp', href: 'https://wa.me/628xxxx', external: true },
        { name: 'Email', href: 'mailto:info@drwestetika.com', external: true },
        { name: 'Lokasi', href: '/lokasi' },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: 'Telepon',
      value: '+62 XXX-XXXX-XXXX',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@drwestetika.com',
    },
    {
      icon: Clock,
      label: 'Jam Operasional',
      value: 'Senin - Sabtu: 09:00 - 20:00',
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-2xl font-serif text-gray-900 mb-4">
              DRW Estetika
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              Klinik kecantikan dan estetika medis profesional dengan teknologi terkini. 
              Kami berkomitmen memberikan hasil terbaik dengan sentuhan personal untuk setiap klien.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'tiktok'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-sm"
                  title={social}
                >
                  <span className="text-sm font-bold">
                    {social === 'facebook' && 'f'}
                    {social === 'instagram' && '@'}
                    {social === 'tiktok' && '♪'}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 py-12 border-t border-b border-gray-200"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-4 items-start"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-1">
                    {info.label}
                  </p>
                  <p className="text-gray-900 font-medium text-sm">
                    {info.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-gray-600 text-sm text-center md:text-left">
            © {currentYear} Klinik Pratama DRW Estetika. Bagian dari PT DRW Corpora. 
            <br className="hidden md:block" />
            <span className="italic">Melayani dengan hati.</span>
          </p>

          <div className="flex gap-8">
            <Link
              href="#"
              className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-sm"
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
