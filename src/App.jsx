import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/public/Home";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Imagens from "./pages/admin/Imagens";
import AdminHero from "./pages/admin/Hero";
import AdminSobre from "./pages/admin/Sobre";
import AdminServicos from "./pages/admin/Servicos";
import AdminPrecos from "./pages/admin/Precos";
import AdminContato from "./pages/admin/Contato";
import AdminEndereco from "./pages/admin/Endereco";

const P = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<P><Dashboard /></P>} />
          <Route path="/admin/imagens" element={<P><Imagens /></P>} />
          <Route path="/admin/hero" element={<P><AdminHero /></P>} />
          <Route path="/admin/sobre" element={<P><AdminSobre /></P>} />
          <Route path="/admin/servicos" element={<P><AdminServicos /></P>} />
          <Route path="/admin/precos" element={<P><AdminPrecos /></P>} />
          <Route path="/admin/contato" element={<P><AdminContato /></P>} />
          <Route path="/admin/endereco" element={<P><AdminEndereco /></P>} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        </Routes>
        <ToastContainer position="bottom-right" theme="dark"
          toastStyle={{ background: "#141414", border: "1px solid rgba(255,255,255,0.1)" }} />
      </BrowserRouter>
    </AuthProvider>
  );
}
