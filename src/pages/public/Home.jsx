import { useDocument, useCollection } from "../../hooks/useFirestore";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/sections/Hero";
import Sobre from "../../components/sections/Sobre";
import Servicos from "../../components/sections/Servicos";
import Precos from "../../components/sections/Precos";
import Contato from "../../components/sections/Contato";
import Endereco from "../../components/sections/Endereco";
import WhatsAppFloat from "../../components/ui/WhatsAppFloat";
import { HeroSkeleton } from "../../components/ui/SkeletonLoader";
import { driveUrl } from "../../services/firestore";

export default function Home() {
  const { data: hero, loading: heroLoading } = useDocument("hero");
  const { data: about } = useDocument("about");
  const { data: contact } = useDocument("contact");
  const { data: services } = useCollection("services");
  const { data: prices } = useCollection("prices");
  const { data: images } = useDocument("settings", "images");
  const { data: address } = useDocument("settings", "address");

  if (heroLoading) return <HeroSkeleton />;

  const logoUrl = driveUrl(images?.logo);

  return (
    <div className="bg-[#0a0a0a]">
      <Navbar bookingUrl={contact?.bookingUrl} bookingText={contact?.bookingText} logoUrl={logoUrl} />
      <Hero data={hero} bookingUrl={contact?.bookingUrl} bookingText={contact?.bookingText} />
      <Sobre data={about} />
      <Servicos data={services} />
      <Precos data={prices} />
      <Contato data={contact} />
      <Endereco data={address} />
      <WhatsAppFloat whatsapp={contact?.whatsapp} />

      {/* Footer simples */}
      <footer className="bg-[#0d0d0d] border-t border-white/5 py-8 text-center">
        <p className="text-white/20 text-sm">
          © {new Date().getFullYear()} Stiphens Barbershop Desenvolvido por RickGZ007 · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
