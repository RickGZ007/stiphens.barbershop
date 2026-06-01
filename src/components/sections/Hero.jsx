import { motion } from "framer-motion";
import { driveUrl } from "../../services/firestore";

const DEFAULT = {
  title: "Arte em Cada Corte",
  subtitle: "Barbearia premium com identidade latina. Experiencia, estilo e sofisticacao em cada detalhe.",
  buttonText: "Agendar Agora",
  buttonUrl: "#",
  imageUrl: "",
};

export default function Hero({ data, bookingUrl, bookingText }) {
  const d = { ...DEFAULT, ...data };
  const bg = driveUrl(d.imageUrl);

  return (
    <>
      {/* BANNER — imagem limpa, sem nada em cima */}
      <section id="home" className="relative w-full overflow-hidden"
        style={{ 
          height: "min(100svh, 56.25vw)",  /* 56.25vw = proporção 16:9 */
          minHeight: "280px"
        }}>
        <div className="absolute inset-0">
          {bg ? (
            <img
              src={bg}
              alt="Hero"
              className="w-full h-full"
              style={{ objectFit: "contain", objectPosition: "center", opacity: 0.75 }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#141414] via-[#0a0a0a] to-[#1a0a0f]" />
          )}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 30%, transparent 60%, rgba(10,10,10,1) 100%)" }} />
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* CTA — separado do banner */}
      <section className="bg-[#0d0d0d] border-y border-white/5 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <div className="w-8 h-px bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium">
                  Stiphens Barbershop
                </span>
              </div>
              <h2 style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                {d.title}
              </h2>
              <p className="text-white/50 max-w-md leading-relaxed text-sm md:text-base">
                {d.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <a href={bookingUrl || d.buttonUrl} target="_blank" rel="noopener noreferrer"
                 className="btn-gold text-center text-base px-8 py-4 w-full sm:w-auto">
                {bookingText || d.buttonText}
              </a>
              <button
                onClick={() => document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-white/20 text-white/70 hover:text-white hover:border-white/40
                           px-8 py-4 rounded font-semibold tracking-wide transition-all text-base w-full sm:w-auto">
                Ver Servicos
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
