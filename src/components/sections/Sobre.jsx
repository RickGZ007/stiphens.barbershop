import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { driveUrl } from "../../services/firestore";

const DEFAULT = {
  title: "Nossa Historia",
  subtitle: "Raizes venezuelanas, paixao pelo estilo",
  body: "A Stiphens Barbershop nasceu do sonho de um empreendedor venezuelano que trouxe consigo a cultura, a elegancia e o rigor de um atendimento premium. Cada corte e uma expressao de arte, cada detalhe reflete anos de dedicacao ao oficio da barbearia.",
  body2: "Acreditamos que uma boa barbearia e mais do que um lugar para cortar o cabelo — e um espaco de confianca, estilo e identidade masculina.",
  imageUrl: "",
};

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

export default function Sobre({ data }) {
  const d = { ...DEFAULT, ...data };
  const img = driveUrl(d.imageUrl);

  return (
    <section id="sobre" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <FadeIn>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#1e1e1e]">
                {img ? (
                  <img src={img} alt="Barbearia" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/10 text-6xl">✂</span>
                  </div>
                )}
              </div>
              {/* Gold accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#c9a84c]/30 rounded-2xl -z-10" />
              {/* Baseball dots */}
              <div className="absolute top-4 -left-4 flex flex-col gap-2 opacity-30">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase">Sobre nos</span>
              </div>
              <h2 style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {d.title}
              </h2>
              <p className="text-[#c9a84c] font-medium mt-2">{d.subtitle}</p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-white/60 leading-relaxed text-lg">{d.body}</p>
            </FadeIn>

            {d.body2 && (
              <FadeIn delay={0.3}>
                <p className="text-white/50 leading-relaxed">{d.body2}</p>
              </FadeIn>
            )}

            <FadeIn delay={0.4}>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { num: "+10", label: "Anos de experiencia" },
                  { num: "100%", label: "Dedicacao" },
                  { num: "★★★★★", label: "Atendimento" },
                ].map(stat => (
                  <div key={stat.label} className="border-l border-[#c9a84c]/30 pl-4">
                    <p className="text-[#c9a84c] font-bold text-xl">{stat.num}</p>
                    <p className="text-white/40 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
