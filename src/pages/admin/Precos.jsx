import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EMPTY = { serviceName: "", description: "", price: "", featured: false };

export default function AdminPrecos() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    const snap = await getDocs(collection(db, "prices"));
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setPrices(docs.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditing("new"); };
  const openEdit = (p) => { setForm({ serviceName: p.serviceName, description: p.description || "", price: p.price, featured: p.featured || false }); setEditing(p); };
  const close = () => { setEditing(null); setForm(EMPTY); };

  const save = async () => {
    if (!form.serviceName.trim() || !form.price) { toast.error("Nome e preco obrigatorios"); return; }
    setSaving(true);
    try {
      if (editing === "new") {
        await addDoc(collection(db, "prices"), { ...form, displayOrder: prices.length, createdAt: new Date() });
        toast.success("Preco adicionado!");
      } else {
        await setDoc(doc(db, "prices", editing.id), { ...form, displayOrder: editing.displayOrder ?? 0, updatedAt: new Date() });
        toast.success("Preco atualizado!");
      }
      close(); load();
    } catch { toast.error("Erro ao salvar"); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!confirm("Excluir este preco?")) return;
    await deleteDoc(doc(db, "prices", id));
    toast.success("Removido"); load();
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#141414] border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/admin/dashboard")} className="text-white/40 hover:text-white text-xl">←</button>
          <span style={{ fontFamily: "Playfair Display, serif" }} className="text-white font-bold">Gerenciar Precos</span>
        </div>
        <button onClick={openNew} className="btn-gold text-sm px-4 py-2">+ Novo Preco</button>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-3">
        {prices.length === 0 && (
          <div className="text-center py-16 text-white/20">
            <p className="text-4xl mb-3">💰</p>
            <p>Nenhum preco. Clique em "+ Novo Preco"</p>
          </div>
        )}
        <AnimatePresence>
          {prices.map(p => (
            <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`flex items-center justify-between px-5 py-4 rounded-xl border
                ${p.featured ? "bg-[#7b1c2e]/10 border-[#7b1c2e]/30" : "bg-[#141414] border-white/5"}`}>
              <div>
                <div className="flex items-center gap-2">
                  {p.featured && <span className="text-[#c9a84c] text-xs font-bold bg-[#c9a84c]/10 px-2 py-0.5 rounded">Popular</span>}
                  <p className="text-white font-medium">{p.serviceName}</p>
                </div>
                {p.description && <p className="text-white/30 text-sm">{p.description}</p>}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#c9a84c] font-bold">R$ {p.price}</span>
                <button onClick={() => openEdit(p)} className="text-xs px-3 py-1.5 border border-white/10 text-white/50 hover:text-white rounded transition-colors">Editar</button>
                <button onClick={() => remove(p.id)} className="text-xs px-3 py-1.5 border border-red-900/40 text-red-400/60 hover:text-red-400 rounded transition-colors">Excluir</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-[#141414] border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4">
              <h3 className="text-white font-semibold text-lg">{editing === "new" ? "Novo Preco" : "Editar Preco"}</h3>
              <div>
                <label className="label-admin">Nome do servico</label>
                <input className="input-admin" placeholder="Ex: Corte Masculino"
                  value={form.serviceName} onChange={e => setForm(f => ({ ...f, serviceName: e.target.value }))} />
              </div>
              <div>
                <label className="label-admin">Descricao (opcional)</label>
                <input className="input-admin" placeholder="Ex: Inclui lavagem"
                  value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="label-admin">Preco (so numeros)</label>
                <input className="input-admin" placeholder="Ex: 40" type="number"
                  value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured}
                  onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 accent-[#c9a84c]" />
                <span className="text-white/60 text-sm">Marcar como Popular (destaque vinho)</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button onClick={close} className="flex-1 border border-white/10 text-white/50 py-2.5 rounded hover:text-white transition-colors">Cancelar</button>
                <button onClick={save} disabled={saving} className="flex-1 btn-gold">{saving ? "Salvando..." : "Salvar"}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
