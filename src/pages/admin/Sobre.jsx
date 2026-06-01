import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { driveUrl } from "../../services/firestore";

export default function AdminSobre() {
  const [form, setForm] = useState({ title: "", subtitle: "", body: "", body2: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "about", "main")).then(snap => {
      if (snap.exists()) setForm(snap.data());
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "about", "main"), { ...form, updatedAt: new Date() });
      toast.success("Sobre salvo!");
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
        <span style={{ fontFamily: "Playfair Display, serif" }} className="text-white font-bold">Editar Sobre</span>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">

          <div>
            <label className="label-admin">Foto da barbearia</label>
            <input className="input-admin" placeholder="Cole o link do Imgur (imgur.com) ou qualquer URL de imagem"
              value={form.imageUrl} onChange={e => set("imageUrl", e.target.value)} />
            {preview && (
              <div className="mt-3 rounded-lg overflow-hidden border border-white/5 h-40">
                <img src={preview} alt="preview" className="w-full h-full object-cover"
                  onError={e => e.target.style.display = "none"} />
              </div>
            )}
          </div>

          <div>
            <label className="label-admin">Titulo</label>
            <input className="input-admin" placeholder="Ex: Nossa Historia"
              value={form.title} onChange={e => set("title", e.target.value)} />
          </div>

          <div>
            <label className="label-admin">Subtitulo</label>
            <input className="input-admin" placeholder="Ex: Raizes venezuelanas, paixao pelo estilo"
              value={form.subtitle} onChange={e => set("subtitle", e.target.value)} />
          </div>

          <div>
            <label className="label-admin">Texto principal</label>
            <textarea className="input-admin resize-none" rows={5}
              placeholder="Historia da barbearia..."
              value={form.body} onChange={e => set("body", e.target.value)} />
          </div>

          <div>
            <label className="label-admin">Texto secundario (opcional)</label>
            <textarea className="input-admin resize-none" rows={3}
              placeholder="Complemento da historia..."
              value={form.body2} onChange={e => set("body2", e.target.value)} />
          </div>

          <button onClick={save} disabled={saving} className="w-full btn-gold">
            {saving ? "Salvando..." : "Salvar Sobre"}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
