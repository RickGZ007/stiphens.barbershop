import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const modules = [
  { label: "Hero", icon: "🖼️", path: "/admin/hero", desc: "Imagem, titulo, botao" },
  { label: "Sobre", icon: "📖", path: "/admin/sobre", desc: "Historia da barbearia" },
  { label: "Servicos", icon: "✂️", path: "/admin/servicos", desc: "Gerenciar servicos" },
  { label: "Precos", icon: "💰", path: "/admin/precos", desc: "Tabela de precos" },
  { label: "Contato", icon: "📱", path: "/admin/contato", desc: "WhatsApp, Instagram" },
  { label: "Endereco", icon: "📍", path: "/admin/endereco", desc: "Mapa e localizacao" },
  { label: "Imagens", icon: "🔗", path: "/admin/imagens", desc: "Links do Google Drive" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Saiu com sucesso");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#141414] border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#c9a84c]">✦</span>
          <span style={{ fontFamily: "Playfair Display, serif" }}
                className="text-white font-bold tracking-wider">STIPHENS ADMIN</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-sm hidden sm:block">{user?.email}</span>
          <button onClick={handleLogout}
            className="text-sm text-white/50 hover:text-white/80 transition-colors">
            Sair
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-white/40 text-sm tracking-widest uppercase mb-1">Painel</h1>
          <h2 style={{ fontFamily: "Playfair Display, serif" }}
              className="text-3xl font-bold text-white mb-8">Gerenciar Conteudo</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, i) => (
              <motion.button
                key={mod.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => navigate(mod.path)}
                className="bg-[#141414] border border-white/5 rounded-xl p-6 text-left
                           hover:border-[#c9a84c]/30 hover:bg-[#1a1a1a] transition-all group"
              >
                <span className="text-3xl mb-3 block">{mod.icon}</span>
                <p className="text-white font-semibold group-hover:text-[#c9a84c] transition-colors">
                  {mod.label}
                </p>
                <p className="text-white/30 text-sm mt-1">{mod.desc}</p>
              </motion.button>
            ))}
          </div>

          {/* View site link */}
          <div className="mt-8 text-center">
            <a href="/" target="_blank"
               className="text-white/30 text-sm hover:text-[#c9a84c] transition-colors">
              Ver site publico →
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
