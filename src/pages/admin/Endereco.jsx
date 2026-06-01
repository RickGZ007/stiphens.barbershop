import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EMPTY_LOC = { name: "", address: "", mapUrl: "" };

function extractMapSrc(raw) {
  if (!raw) return null;
  const match = raw.match(/src="([^"]+)"/);
  if (match) return match[1];
  if (raw.startsWith("http")) return raw;
  return null;
}

export default function AdminEndereco() {
  const [locations, setLocations] = useState([{ ...EMPTY_LOC }]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "settings", "address")).then(snap => {
      if (snap.exists()) {
        const d = snap.data();
        // suporta formato antigo (address + mapUrl) e novo (locations[])
        if (d.locations?.length) {
          setLocations(d.locations);
        } else if (d.address || d.mapUrl) {
          setLocations([{ name: "", address: d.address || "", mapUrl: d.mapUrl || "" }]);
        }
      }
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "address"), { locations, updatedAt: new Date() });
      toast.success("Enderecos salvos!");
    } catch { toast.error("Erro ao salvar"); }
    finally { setSaving(false); }
  };

  const update = (i, key, val) => {
    setLocations(locs => locs.map((l, idx) => idx === i ? { ...l, [key]: val } : l));
  };

  const addLocation = () => setLocations(locs => [...locs, { ...EMPTY_LOC }]);
  const removeLocation = (i) => setLocations(locs => locs.filter((_, idx) => idx !== i));

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#141414] border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/admin/dashboard")} className="text-white/40 hover:text-white text-xl">←</button>
          <span style={{ fontFamily: "Playfair Display, serif" }} className="text-white font-bold">Enderecos</span>
        </div>
        <button onClick={addLocation} className="btn-gold text-sm px-4 py-2">+ Adicionar Unidade</button>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-6">

        <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-xl p-4">
          <p className="text-[#c9a84c] text-sm font-semibold mb-2">Como pegar o link do mapa:</p>
          <ol className="text-white/50 text-xs space-y-1 list-decimal list-inside">
            <li>Abra o Google Maps e busque o endereco</li>
            <li>Clique em <strong className="text-white/70">Compartilhar → Incorporar um mapa</strong></li>
            <li>Copie <strong className="text-white/70">todo o codigo do iframe</strong> e cole no campo abaixo</li>
          </ol>
        </div>

        <AnimatePresence>
          {locations.map((loc, i) => {
            const preview = extractMapSrc(loc.mapUrl);
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-[#141414] border border-white/5 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm font-medium">
                    {locations.length > 1 ? `Unidade ${i + 1}` : "Endereco"}
                  </span>
                  {locations.length > 1 && (
                    <button onClick={() => removeLocation(i)}
                      className="text-red-400/50 hover:text-red-400 text-xs border border-red-900/30 px-3 py-1 rounded transition-colors">
                      Remover
                    </button>
                  )}
                </div>

                {locations.length > 1 && (
                  <div>
                    <label className="label-admin">Nome da unidade</label>
                    <input className="input-admin" placeholder="Ex: Unidade Centro"
                      value={loc.name} onChange={e => update(i, "name", e.target.value)} />
                  </div>
                )}

                <div>
                  <label className="label-admin">Endereco completo</label>
                  <input className="input-admin" placeholder="Ex: Rua Francisco Derosso, 2300 - Curitiba, PR"
                    value={loc.address} onChange={e => update(i, "address", e.target.value)} />
                </div>

                <div>
                  <label className="label-admin">Codigo do iframe do Google Maps</label>
                  <textarea className="input-admin resize-none font-mono text-xs" rows={4}
                    placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
                    value={loc.mapUrl} onChange={e => update(i, "mapUrl", e.target.value)} />
                </div>

                {preview && (
                  <div className="rounded-xl overflow-hidden border border-white/5" style={{ height: 280 }}>
                    <iframe src={preview} width="100%" height="100%" style={{ border: 0 }}
                      allowFullScreen loading="lazy" title={`Preview ${i}`} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        <button onClick={save} disabled={saving} className="w-full btn-gold">
          {saving ? "Salvando..." : "Salvar Enderecos"}
        </button>
      </main>
    </div>
  );
}
