import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch {
      toast.error("Email ou senha invalidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#c9a84c] text-2xl">✦</span>
            <h1 style={{ fontFamily: "Playfair Display, serif" }}
                className="text-3xl font-bold text-white tracking-widest uppercase">
              Stiphens
            </h1>
            <span className="text-[#c9a84c] text-2xl">✦</span>
          </div>
          <p className="text-white/40 text-sm tracking-widest uppercase">Barbershop · Admin</p>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-xl p-8">
          <h2 className="text-white font-semibold text-lg mb-6">Entrar no painel</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label-admin">Email</label>
              <input type="email" className="input-admin" placeholder="admin@stiphens.com"
                {...register("email", { required: "Email obrigatorio" })} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label-admin">Senha</label>
              <input type="password" className="input-admin" placeholder="••••••••"
                {...register("password", { required: "Senha obrigatoria" })} />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-gold mt-2 disabled:opacity-50">
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <div className="flex justify-center mt-6 gap-1">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
