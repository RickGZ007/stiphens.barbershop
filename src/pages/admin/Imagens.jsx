import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { driveUrl } from "../../services/firestore";

const IMAGE_SLOTS = [
  { key: "logo", label: "Logo da Barbearia", hint: "Aparece na navbar. PNG transparente fica melhor." },
  { key: "hero_bg", label: "Hero — Imagem de fundo", hint: "Imagem principal do banner." },
  { key: "about_img", label: "Sobre — Foto da barbearia", hint: "Foto exibida na secao Sobre." },
];

export default function Imagens() {
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "settings", "images")).then(snap => {
      if (snap.exists()) setLinks(snap.data());
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "images"), links);
      toast.success("Imagens salvas!");
    } catch { toast.error("Erro ao salvar"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#141414] border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/admin/dashboard")} className="text-white/40 hover:text-white text-xl">←</button>
        <span style={{ fontFamily: "Playfair Display, serif" }} className="text-white font-bold">Gerenciar Imagens</span>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

          <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-5">
            <p className="text-green-400 font-semibold mb-2">✅ Google Drive funciona aqui</p>
            <ol className="text-white/60 text-sm space-y-1 list-decimal list-inside">
              <li>Abra o arquivo no Google Drive</li>
              <li>Botao direito → <strong className="text-white/80">Compartilhar</strong> → "Qualquer pessoa com o link"</li>
              <li>Copie o link e cole abaixo</li>
            </ol>
          </div>

          {IMAGE_SLOTS.map((slot) => {
            const url = links[slot.key] || "";
            const preview = driveUrl(url);
            return (
              <div key={slot.key} className="bg-[#141414] border border-white/5 rounded-xl p-5">
                <label className="label-admin text-white/80 font-semibold">{slot.label}</label>
                {slot.hint && <p className="text-white/30 text-xs mb-2">{slot.hint}</p>}
                <input className="input-admin"
                  placeholder="Cole o link do Google Drive ou URL direta"
                  value={url}
                  onChange={e => setLinks({ ...links, [slot.key]: e.target.value })} />
                {preview && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-white/5 h-32">
                    <img src={preview} alt={slot.label} className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = "none"; }} />
                  </div>
                )}
              </div>
            );
          })}

          <button onClick={handleSave} disabled={saving} className="w-full btn-gold">
            {saving ? "Salvando..." : "Salvar imagens"}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
