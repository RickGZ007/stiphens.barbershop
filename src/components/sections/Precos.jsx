import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DEFAULT = [
  { id: "1", serviceName: "Corte Masculino", price: "40", featured: false, displayOrder: 0 },
  { id: "2", serviceName: "Barba", price: "25", featured: false, displayOrder: 1 },
  { id: "3", serviceName: "Corte + Barba", price: "60", featured: true, displayOrder: 2 },
  { id: "4", serviceName: "Corte Infantil", price: "35", featured: false, displayOrder: 3 },
  { id: "5", serviceName: "Sobrancelha", price: "15", featured: false, displayOrder: 4 },
  { id: "6", serviceName: "Pigmentacao", price: "50", featured: false, displayOrder: 5 },
];

export default function Precos({ data }) {
  const prices = data?.length ? data : DEFAULT;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="precos" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase">Investimento</span>
            <div className="w-8 h-px bg-[#c9a84c]" />
          </div>
          <h2 style={{ fontFamily: "Playfair Display, serif" }}
              className="text-4xl md:text-5xl font-bold text-white">Tabela de Precos</h2>
        </motion.div>

        <div className="space-y-3">
          {prices.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-center justify-between px-6 py-4 rounded-xl border transition-all
                ${item.featured
                  ? "bg-[#7b1c2e]/20 border-[#7b1c2e]/40 hover:border-[#7b1c2e]/70"
                  : "bg-[#141414] border-white/5 hover:border-white/15"}`}>
              <div className="flex items-center gap-3">
                {item.featured && (
                  <span className="text-[#c9a84c] text-xs font-bold tracking-widest uppercase
                                   bg-[#c9a84c]/10 px-2 py-0.5 rounded">Popular</span>
                )}
                <span className={`font-medium ${item.featured ? "text-white" : "text-white/80"}`}>
                  {item.serviceName}
                </span>
                {item.description && (
                  <span className="text-white/30 text-sm hidden sm:block">— {item.description}</span>
                )}
              </div>
              <span className={`font-bold text-lg tabular-nums ${item.featured ? "text-[#c9a84c]" : "text-white/70"}`}>
                R$ {item.price}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Baseball decoration */}
        <div className="flex justify-center mt-10 gap-2 opacity-15">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`rounded-full bg-[#c9a84c] ${i % 3 === 1 ? "w-3 h-3" : "w-1.5 h-1.5"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
