import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ICONS = ["corte", "barba", "pigmentacao", "infantil", "sobrancelha", "hidratacao", "default"];
const ICON_MAP = { corte: "✂️", barba: "🪒", pigmentacao: "🎨", infantil: "👦", sobrancelha: "👁️", hidratacao: "💧", default: "⚡" };

const EMPTY = { name: "", description: "", icon: "default" };

export default function AdminServicos() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | service object
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const q = query(collection(db, "services"), orderBy("displayOrder"));
      const snap = await getDocs(q);
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, "services"));
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditing("new"); };
  const openEdit = (s) => { setForm({ name: s.name, description: s.description, icon: s.icon || "default" }); setEditing(s); };
  const close = () => { setEditing(null); setForm(EMPTY); };

  const save = async () => {
    if (!form.name.trim()) { toast.error("Nome obrigatorio"); return; }
    setSaving(true);
    try {
      if (editing === "new") {
        await addDoc(collection(db, "services"), { ...form, displayOrder: services.length, createdAt: new Date() });
        toast.success("Servico adicionado!");
      } else {
        await setDoc(doc(db, "services", editing.id), { ...form, displayOrder: editing.displayOrder ?? 0, updatedAt: new Date() });
        toast.success("Servico atualizado!");
      }
      close();
      load();
    } catch { toast.error("Erro ao salvar"); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!confirm("Excluir este servico?")) return;
    await deleteDoc(doc(db, "services", id));
    toast.success("Servico removido");
    load();
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#141414] border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/admin/dashboard")} className="text-white/40 hover:text-white text-xl">←</button>
          <span style={{ fontFamily: "Playfair Display, serif" }} className="text-white font-bold">Gerenciar Servicos</span>
        </div>
        <button onClick={openNew} className="btn-gold text-sm px-4 py-2">+ Novo Servico</button>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-4">
        {services.length === 0 && (
          <div className="text-center py-16 text-white/20">
            <p className="text-4xl mb-3">✂️</p>
            <p>Nenhum servico ainda. Clique em "+ Novo Servico"</p>
          </div>
        )}

        <AnimatePresence>
          {services.map(s => (
            <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-[#141414] border border-white/5 rounded-xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{ICON_MAP[s.icon] || "⚡"}</span>
                <div>
                  <p className="text-white font-semibold">{s.name}</p>
                  <p className="text-white/40 text-sm">{s.description}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(s)}
                  className="text-xs px-3 py-1.5 border border-white/10 text-white/50 hover:text-white rounded transition-colors">
                  Editar
                </button>
                <button onClick={() => remove(s.id)}
                  className="text-xs px-3 py-1.5 border border-red-900/40 text-red-400/60 hover:text-red-400 rounded transition-colors">
                  Excluir
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-[#141414] border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4">
              <h3 className="text-white font-semibold text-lg">
                {editing === "new" ? "Novo Servico" : "Editar Servico"}
              </h3>

              <div>
                <label className="label-admin">Nome do servico</label>
                <input className="input-admin" placeholder="Ex: Corte Masculino"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>

              <div>
                <label className="label-admin">Descricao</label>
                <textarea className="input-admin resize-none" rows={3}
                  placeholder="Ex: Corte classico com acabamento impecavel"
                  value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>

              <div>
                <label className="label-admin">Icone</label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {ICONS.map(ic => (
                    <button key={ic} onClick={() => setForm(f => ({ ...f, icon: ic }))}
                      className={`p-3 rounded-lg border text-xl transition-colors ${
                        form.icon === ic ? "border-[#c9a84c] bg-[#c9a84c]/10" : "border-white/5 hover:border-white/20"
                      }`}>
                      {ICON_MAP[ic]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={close} className="flex-1 border border-white/10 text-white/50 py-2.5 rounded hover:text-white transition-colors">
                  Cancelar
                </button>
                <button onClick={save} disabled={saving} className="flex-1 btn-gold">
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
