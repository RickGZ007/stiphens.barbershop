import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Servicos", href: "#servicos" },
  { label: "Precos", href: "#precos" },
  { label: "Contato", href: "#contato" },
  { label: "Endereco", href: "#endereco" },
];

export default function Navbar({ bookingUrl, bookingText, logoUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 group">
          <img
            src={logoUrl || "https://drive.google.com/thumbnail?id=1YOhZQ-O8WbTy_X6InceUV-Z0Lpt_FXCq&sz=w1000"}
            alt="Logo Stiphens Barbershop"
            className="h-14 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <span style={{ fontFamily: "Playfair Display, serif" }}
                className="text-white font-bold tracking-widest text-lg uppercase">
            Stiphens
          </span>
          <span className="text-[#c9a84c] text-xs tracking-widest uppercase hidden sm:block">
            Barbershop
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button key={l.label} onClick={() => scrollTo(l.href)}
              className="text-white/50 hover:text-white text-sm tracking-wide transition-colors">
              {l.label}
            </button>
          ))}
          {bookingUrl && (
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
               className="btn-primary text-sm px-4 py-2">
              {bookingText || "Agendar"}
            </a>
          )}
        </nav>

        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setOpen(!open)}>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f0f0f] border-t border-white/5 overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <button key={l.label} onClick={() => scrollTo(l.href)}
                  className="text-white/60 hover:text-white text-left text-sm tracking-wide transition-colors">
                  {l.label}
                </button>
              ))}
              {bookingUrl && (
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                   className="btn-primary text-sm text-center mt-2">
                  {bookingText || "Agendar"}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
