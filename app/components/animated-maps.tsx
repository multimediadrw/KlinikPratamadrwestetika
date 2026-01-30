"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface Branch {
  id: number;
  name: string;
  alamat: string;
  telp: string;
  wa: string | string[];
  mapEmbed: string;
}

interface AnimatedMapsProps {
  branches: Branch[];
}

const AnimatedMaps = ({ branches }: AnimatedMapsProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <div className="space-y-12">
        {branches.map((branch, idx) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Maps */}
            <div className="w-full h-80">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={branch.mapEmbed}
              />
            </div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 + 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="p-8"
            >
              <h3 className="text-2xl font-bold text-pink-900 mb-6">{branch.name}</h3>
              <div className="space-y-4 text-gray-700">
                <p><strong>📍 Alamat:</strong> {branch.alamat}</p>
                <p>
                  <strong>📞 Telepon:</strong>{" "}
                  <a href={`tel:${branch.telp}`} className="text-pink-600 hover:underline">
                    {branch.telp}
                  </a>
                </p>
                <p>
                  <strong>💬 WhatsApp:</strong>{" "}
                  {Array.isArray(branch.wa) ? (
                    branch.wa.map((w, i) => (
                      <span key={i}>
                        <a
                          href={`https://wa.me/62${w.replace(/^0/, "")}`}
                          className="text-green-600 hover:underline"
                        >
                          {w}
                        </a>
                        {i < branch.wa.length - 1 && ", "}
                      </span>
                    ))
                  ) : (
                    <a
                      href={`https://wa.me/62${branch.wa.replace(/^0/, "")}`}
                      className="text-green-600 hover:underline"
                    >
                      {branch.wa}
                    </a>
                  )}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export { AnimatedMaps };
