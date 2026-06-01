import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminContato() {
  const [form, setForm] = useState({ whatsapp: "", instagram: "", phone: "", hours: "", bookingUrl: "", bookingText: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "contact", "main")).then(snap => {
      if (snap.exists()) setForm(snap.data());
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "contact", "main"), { ...form, updatedAt: new Date() });
      toast.success("Contato salvo!");
    } catch { toast.error("Erro ao salvar"); }
    finally { setSaving(false); }
  };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#141414] border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/admin/dashboard")} className="text-white/40 hover:text-white text-xl">←</button>
        <span style={{ fontFamily: "Playfair Display, serif" }} className="text-white font-bold">Editar Contato</span>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">

          <div>
            <label className="label-admin">WhatsApp (so numeros com DDD)</label>
            <input className="input-admin" placeholder="Ex: 5511999999999"
              value={form.whatsapp} onChange={e => set("whatsapp", e.target.value)} />
            <p className="text-white/20 text-xs mt-1">Este numero aparece no botao flutuante e na secao de contato</p>
          </div>

          <div>
            <label className="label-admin">Instagram</label>
            <input className="input-admin" placeholder="Ex: @stiphens.barbershop ou stiphens.barbershop"
              value={form.instagram} onChange={e => set("instagram", e.target.value)} />
            <p className="text-white/20 text-xs mt-1">Digite o @ ou o nome — aparece como @nome no site</p>
          </div>

          <div>
            <label className="label-admin">Telefone</label>
            <input className="input-admin" placeholder="Ex: (11) 9999-9999"
              value={form.phone} onChange={e => set("phone", e.target.value)} />
          </div>

          <div>
            <label className="label-admin">Horario de funcionamento</label>
            <input className="input-admin" placeholder="Ex: Seg-Sex: 9h-19h | Sab: 9h-17h"
              value={form.hours} onChange={e => set("hours", e.target.value)} />
          </div>

          <hr className="border-white/5" />

          <div>
            <label className="label-admin">Link do botao Agendar (navbar + hero)</label>
            <input className="input-admin" placeholder="https://wa.me/55... ou link do Booksy"
              value={form.bookingUrl} onChange={e => set("bookingUrl", e.target.value)} />
          </div>

          <div>
            <label className="label-admin">Texto do botao Agendar</label>
            <input className="input-admin" placeholder="Ex: Agendar Agora"
              value={form.bookingText} onChange={e => set("bookingText", e.target.value)} />
          </div>

          <button onClick={save} disabled={saving} className="w-full btn-gold">
            {saving ? "Salvando..." : "Salvar Contato"}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
