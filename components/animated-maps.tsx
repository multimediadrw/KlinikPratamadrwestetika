import * as React from "react";

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

export const AnimatedMaps = ({ branches }: AnimatedMapsProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <div className="space-y-12">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Map */}
              <div className="h-96 md:h-full">
                <iframe
                  src={branch.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Info */}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-pink-900 mb-4">
                  {branch.name}
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Alamat
                    </p>
                    <p className="text-gray-700">{branch.alamat}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Telepon
                    </p>
                    <p className="text-gray-700">{branch.telp}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      WhatsApp
                    </p>
                    {Array.isArray(branch.wa) ? (
                      <div className="space-y-2">
                        {branch.wa.map((wa, idx) => (
                          <a
                            key={idx}
                            href={`https://wa.me/${wa.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-700 font-semibold block"
                          >
                            {wa}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a
                        href={`https://wa.me/${branch.wa.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700 font-semibold"
                      >
                        {branch.wa}
                      </a>
                    )}
                  </div>
                </div>

                <a
                  href={`https://wa.me/${
                    Array.isArray(branch.wa)
                      ? branch.wa[0].replace(/\D/g, "")
                      : branch.wa.replace(/\D/g, "")
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold text-center"
                >
                  Hubungi Kami
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
