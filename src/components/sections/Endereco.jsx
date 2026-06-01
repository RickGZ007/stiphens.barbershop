import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Extrai o src de um iframe colado ou retorna a URL direta
function extractMapSrc(raw) {
  if (!raw) return null;
  const match = raw.match(/src="([^"]+)"/);
  if (match) return match[1];
  if (raw.startsWith("http")) return raw;
  return null;
}

export default function Endereco({ data }) {
  const locations = data?.locations?.length ? data.locations : 
    data?.address ? [{ address: data.address, mapUrl: data.mapUrl }] : [];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="endereco" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase">Como chegar</span>
            <div className="w-8 h-px bg-[#c9a84c]" />
          </div>
          <h2 style={{ fontFamily: "Playfair Display, serif" }}
              className="text-4xl md:text-5xl font-bold text-white">
            {locations.length > 1 ? "Nossas Unidades" : "Endereco"}
          </h2>
        </motion.div>

        {locations.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-[#141414] aspect-video
                          flex items-center justify-center">
            <div className="text-center text-white/20">
              <p className="text-4xl mb-3">🗺️</p>
              <p className="text-sm">Cadastre o endereco no painel admin</p>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {locations.map((loc, i) => {
              const src = extractMapSrc(loc.mapUrl);
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}>
                  {locations.length > 1 && (
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-7 rounded-full bg-[#7b1c2e] flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                      <p className="text-white font-semibold">{loc.name || `Unidade ${i + 1}`}</p>
                    </div>
                  )}
                  {loc.address && (
                    <p className="text-white/50 flex items-center gap-2 mb-4">
                      <span>📍</span> {loc.address}
                    </p>
                  )}
                  {src ? (
                    <div className="rounded-2xl overflow-hidden border border-white/5 w-full"
                         style={{ height: 400 }}>
                      <iframe src={src} width="100%" height="100%" style={{ border: 0 }}
                        allowFullScreen loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={loc.name || "Mapa"} />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-white/5 bg-[#141414] flex items-center justify-center"
                         style={{ height: 200 }}>
                      <p className="text-white/20 text-sm">Cole o link do mapa no painel admin</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
