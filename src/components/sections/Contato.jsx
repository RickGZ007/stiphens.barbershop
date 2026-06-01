import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DEFAULT = {
  whatsapp: "",
  instagram: "",
  phone: "",
  hours: "Seg–Sex: 9h–19h | Sab: 9h–17h",
};

export default function Contato({ data }) {
  const d = { ...DEFAULT, ...data };
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const waUrl = d.whatsapp ? `https://wa.me/${d.whatsapp.replace(/\D/g, "")}` : null;

  // Aceita tanto "@handle" quanto "https://instagram.com/handle"
  const rawIg = d.instagram || "";
  const igHandle = rawIg.includes("instagram.com")
    ? rawIg.split("instagram.com/")[1]?.replace(/\/$/, "").split("?")[0]
    : rawIg.replace("@", "").trim();
  const igUrl = igHandle ? `https://instagram.com/${igHandle}` : null;

  const items = [
    waUrl && { icon: "💬", label: "WhatsApp", display: d.whatsapp, href: waUrl },
    igUrl && { icon: "📸", label: "Instagram", display: `@${igHandle}`, href: igUrl },
    d.phone && { icon: "📞", label: "Telefone", display: d.phone, href: `tel:${d.phone.replace(/\D/g,"")}` },
    d.hours && { icon: "🕐", label: "Horario", display: d.hours, href: null },
  ].filter(Boolean);

  return (
    <section id="contato" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase">Fale conosco</span>
            <div className="w-8 h-px bg-[#c9a84c]" />
          </div>
          <h2 style={{ fontFamily: "Playfair Display, serif" }}
              className="text-4xl md:text-5xl font-bold text-white">Contato</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(items.length ? items : [
            { icon: "📱", label: "WhatsApp", display: "Cadastre no painel admin", href: null },
            { icon: "🕐", label: "Horario", display: DEFAULT.hours, href: null },
          ]).map((item, i) => (
            <motion.div key={item.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-4 bg-[#141414] border border-white/5
                              hover:border-[#c9a84c]/30 rounded-xl p-5 transition-all group cursor-pointer">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="overflow-hidden">
                    <p className="text-white/40 text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-[#c9a84c] transition-colors truncate">
                      {item.display}
                    </p>
                  </div>
                  <span className="ml-auto text-white/20 group-hover:text-[#c9a84c] transition-colors text-lg">→</span>
                </a>
              ) : (
                <div className="flex items-center gap-4 bg-[#141414] border border-white/5 rounded-xl p-5">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium">{item.display}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {waUrl && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} className="text-center mt-8">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-gold px-10 py-4">
              Chamar no WhatsApp
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
