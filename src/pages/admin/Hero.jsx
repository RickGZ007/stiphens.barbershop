import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { driveUrl } from "../../services/firestore";

export default function AdminHero() {
  const [form, setForm] = useState({ title: "", subtitle: "", buttonText: "", buttonUrl: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "hero", "main")).then(snap => {
      if (snap.exists()) setForm(snap.data());
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "hero", "main"), { ...form, updatedAt: new Date() });
      toast.success("Hero salvo!");
    } catch { toast.error("Erro ao salvar"); }
    finally { setSaving(false); }
  };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const preview = driveUrl(form.imageUrl);

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#141414] border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/admin/dashboard")} className="text-white/40 hover:text-white text-xl">←</button>
        <span style={{ fontFamily: "Playfair Display, serif" }} className="text-white font-bold">Editar Hero</span>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">

          <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4">
            <p className="text-green-400 text-sm font-semibold mb-1">✅ Google Drive funciona aqui</p>
            <ol className="text-white/50 text-xs space-y-1 list-decimal list-inside">
              <li>Abra o Google Drive e clique na imagem</li>
              <li>Botao direito → <strong className="text-white/70">Compartilhar</strong> → "Qualquer pessoa com o link"</li>
              <li>Copie o link e cole abaixo</li>
            </ol>
          </div>

          <div>
            <label className="label-admin">Imagem de fundo</label>
            <input className="input-admin" placeholder="Cole o link do Google Drive ou qualquer URL de imagem"
              value={form.imageUrl} onChange={e => set("imageUrl", e.target.value)} />
            {preview && (
              <div className="mt-3 rounded-lg overflow-hidden border border-white/5 h-40">
                <img src={preview} alt="preview" className="w-full h-full object-cover"
                  onError={e => e.target.style.display = "none"} />
              </div>
            )}
          </div>

          <div>
            <label className="label-admin">Titulo principal</label>
            <input className="input-admin" placeholder="Ex: Arte em Cada Corte"
              value={form.title} onChange={e => set("title", e.target.value)} />
          </div>

          <div>
            <label className="label-admin">Subtitulo</label>
            <textarea className="input-admin resize-none" rows={3}
              placeholder="Ex: Barbearia premium com identidade latina..."
              value={form.subtitle} onChange={e => set("subtitle", e.target.value)} />
          </div>

          <div>
            <label className="label-admin">Texto do botao</label>
            <input className="input-admin" placeholder="Ex: Agendar Agora"
              value={form.buttonText} onChange={e => set("buttonText", e.target.value)} />
          </div>

          <div>
            <label className="label-admin">Link do botao (WhatsApp, Booksy, Instagram...)</label>
            <input className="input-admin" placeholder="https://wa.me/55..."
              value={form.buttonUrl} onChange={e => set("buttonUrl", e.target.value)} />
          </div>

          <button onClick={save} disabled={saving} className="w-full btn-gold">
            {saving ? "Salvando..." : "Salvar Hero"}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
