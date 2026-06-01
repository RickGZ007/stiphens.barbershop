import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ICON_MAP = {
  corte: "✂️", barba: "🪒", pigmentacao: "🎨", infantil: "👦",
  sobrancelha: "👁️", hidratacao: "💧", default: "⚡"
};

const DEFAULT_SERVICES = [
  { id: "1", name: "Corte Masculino", description: "Corte classico ou moderno com acabamento impecavel.", icon: "corte" },
  { id: "2", name: "Barba", description: "Modelagem e tratamento completo da barba.", icon: "barba" },
  { id: "3", name: "Pigmentacao", description: "Cobertura e pigmentacao profissional.", icon: "pigmentacao" },
  { id: "4", name: "Corte Infantil", description: "Atendimento especial para os pequenos.", icon: "infantil" },
  { id: "5", name: "Sobrancelha", description: "Design e definicao perfeita da sobrancelha.", icon: "sobrancelha" },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const icon = ICON_MAP[service.icon] || ICON_MAP.default;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-[#141414] border border-white/5 rounded-xl p-6 hover:border-[#c9a84c]/30
                 hover:bg-[#161616] transition-all duration-300 group">
      <div className="w-12 h-12 rounded-lg bg-[#7b1c2e]/20 flex items-center justify-center mb-4
                      group-hover:bg-[#7b1c2e]/40 transition-colors">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 style={{ fontFamily: "Playfair Display, serif" }}
          className="text-white font-semibold text-lg mb-2 group-hover:text-[#c9a84c] transition-colors">
        {service.name}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
    </motion.div>
  );
}

export default function Servicos({ data }) {
  const services = data?.length ? data : DEFAULT_SERVICES;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="servicos" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase">O que fazemos</span>
            <div className="w-8 h-px bg-[#c9a84c]" />
          </div>
          <h2 style={{ fontFamily: "Playfair Display, serif" }}
              className="text-4xl md:text-5xl font-bold text-white">Nossos Servicos</h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto">
            Cada servico realizado com tecnica, dedicacao e o toque unico da Stiphens.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>

        {/* Baseball decoration */}
        <div className="flex justify-center mt-12 gap-2 opacity-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`rounded-full bg-white ${i % 3 === 1 ? "w-3 h-3" : "w-1.5 h-1.5"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
