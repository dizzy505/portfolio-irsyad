import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Certificate = {
  title: string;
  issuer: string;
  period: string;
  images: string[];
  description: string;
};

type CertificatesViewProps = {
  certificates: Certificate[];
  setSelectedCertificate: (cert: Certificate | null) => void;
};

export const CertificatesView = ({ certificates, setSelectedCertificate }: CertificatesViewProps) => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [modalIndex, setModalIndex] = useState<Record<string, number>>({});

  const prevImage = (id: string, total: number) => {
    setModalIndex((p) => ({ ...p, [id]: p[id] === undefined ? total - 1 : (p[id] - 1 + total) % total }));
  };
  const nextImage = (id: string, total: number) => {
    setModalIndex((p) => ({ ...p, [id]: p[id] === undefined ? 1 : (p[id] + 1) % total }));
  };
  return (
    <>
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">My Certificates</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Professional certifications and courses I've completed to enhance my skills and knowledge.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => { setActiveCert(cert); setSelectedCertificate(cert); }}
          >
            <div className="h-48 bg-gray-100 overflow-hidden relative">
              <img 
                src={`/images/${(cert.images && cert.images[0]) || ''}`}
                alt={cert.title}
                className="w-full h-full object-contain p-4"
              />
              {/* Option B: subtle bottom overlay with small button */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 flex items-end px-4 pb-3">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <div className="ml-auto relative z-10">
                  <button
                    type="button"
                    className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/90 text-gray-900 text-xs font-medium shadow hover:bg-white transition-colors"
                    aria-label="View certificate details"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 3.5c-3.5 0-6.5 2.1-8 5 1.5 2.9 4.5 5 8 5s6.5-2.1 8-5c-1.5-2.9-4.5-5-8-5Zm0 8.3A3.3 3.3 0 1 1 10 5.2a3.3 3.3 0 0 1 0 6.6Zm0-1.6a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z"/></svg>
                    View details
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-1 line-clamp-2 md:line-clamp-3">{cert.title}</h3>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                <span>{cert.issuer}</span>
                <span>{cert.period}</span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3 md:line-clamp-4">{cert.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Details Modal */}
    <AnimatePresence>
      {activeCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setActiveCert(null)}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            className="bg-black rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-3 right-3 z-10 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
              {(() => {
                const id = activeCert.title;
                const total = activeCert.images.length;
                const idx = modalIndex[id] ?? 0;
                const src = `/images/${activeCert.images[idx]}`;
                return (
                  <div className="relative">
                    <img src={src} alt={activeCert.title} className="w-full max-h-[85vh] object-contain bg-black" />
                    {total > 1 && (
                      <>
                        <button
                          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center"
                          onClick={() => prevImage(id, total)}
                          aria-label="Previous image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </button>
                        <button
                          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center"
                          onClick={() => nextImage(id, total)}
                          aria-label="Next image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
